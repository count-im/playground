export class EventEngine {
  constructor(gameState) {
    this.state = gameState;
  }

  // ── Single condition evaluation ──

  evaluateCondition(condition, state) {
    const s = state ?? this.state;

    switch (condition.type) {
      case 'switch':
        return s.getSwitch(condition.id) === condition.value;

      case 'variable_gte':
        return s.getVar(condition.id) >= condition.value;

      case 'variable_lte':
        return s.getVar(condition.id) <= condition.value;

      case 'variable_eq':
        return s.getVar(condition.id) === condition.value;

      case 'day_eq':
        return s.getVar('V001') === condition.value;

      case 'day_gte':
        return s.getVar('V001') >= condition.value;

      default:
        console.warn(`Unknown condition type: ${condition.type}`);
        return false;
    }
  }

  // ── AND-logic condition list ──

  evaluateConditions(conditions) {
    if (!conditions || conditions.length === 0) return true;
    return conditions.every(c => this.evaluateCondition(c, this.state));
  }

  // ── Effect application ──

  applyEffects(effects) {
    if (!effects) return;

    for (const effect of effects) {
      switch (effect.type) {
        case 'set_variable':
          this.state.setVar(effect.id, effect.value);
          break;

        case 'add_variable':
          this.state.addVar(effect.id, effect.value);
          break;

        case 'set_switch':
          this.state.setSwitch(effect.id, effect.value);
          break;

        case 'add_trust':
          this.state.addVar('V030', effect.value);
          break;

        case 'add_story':
          this.state.addVar('V020', effect.value);
          break;

        default:
          console.warn(`Unknown effect type: ${effect.type}`);
      }
    }
  }

  // ── Dialogue tree lookup ──

  getAvailableDialogueNode(dialogueTree, state) {
    const s = state ?? this.state;

    // Collect nodes, sort by priority (lower = checked first)
    const nodes = Object.values(dialogueTree)
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

    for (const node of nodes) {
      const conditions = node.conditions ?? [];
      const pass = conditions.every(c => this.evaluateCondition(c, s));
      if (pass) return node;
    }

    return null;
  }

  // ── Event filtering ──

  getFilteredEvents(events, day, trigger) {
    if (!events) return [];

    return events.filter(event => {
      // Match day (support single value or array)
      if (event.day !== undefined) {
        const days = Array.isArray(event.day) ? event.day : [event.day];
        if (!days.includes(day)) return false;
      }

      // Match trigger
      if (event.trigger !== undefined && event.trigger !== trigger) {
        return false;
      }

      // All conditions must pass
      return this.evaluateConditions(event.conditions);
    });
  }
}
