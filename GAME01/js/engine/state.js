import { CONFIG } from '../../data/config.js';

export class GameState {
  constructor() {
    this.variables = {};
    this.switches = {};
    this.todayLog = [];
  }

  // ── Variable accessors ──

  getVar(id) {
    return this.variables[id] ?? 0;
  }

  setVar(id, val) {
    this.variables[id] = val;
  }

  addVar(id, amount) {
    const current = this.getVar(id);
    let next = current + amount;

    // Clamp affinity variables (V010-V014) to 0-100
    if (id >= 'V010' && id <= 'V014') {
      next = Math.max(0, Math.min(100, next));
    }

    this.variables[id] = next;
  }

  // ── Switch accessors ──

  getSwitch(id) {
    return this.switches[id] ?? false;
  }

  setSwitch(id, val) {
    this.switches[id] = !!val;
  }

  // ── Persistence ──

  save() {
    const data = {
      variables: { ...this.variables },
      switches: { ...this.switches },
      todayLog: [...this.todayLog],
    };
    localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(data));
  }

  load() {
    const raw = localStorage.getItem(CONFIG.SAVE_KEY);
    if (!raw) return false;

    try {
      const data = JSON.parse(raw);
      this.variables = data.variables ?? {};
      this.switches = data.switches ?? {};
      this.todayLog = data.todayLog ?? [];
      return true;
    } catch {
      return false;
    }
  }

  hasSave() {
    return localStorage.getItem(CONFIG.SAVE_KEY) !== null;
  }

  // ── New game initialization ──

  newGame() {
    // Day & actions
    this.variables = {
      V001: 1,   // day (1-10)
      V002: 2,   // actions remaining
      // NPC affinities (0-100)
      V010: 0,
      V011: 0,
      V012: 0,
      V013: 0,
      V014: 0,
      // Story progress (0-10)
      V020: 0,
      // Village trust (0-100)
      V030: 0,
    };

    // Met-NPC switches
    this.switches = {
      S001: false,
      S002: false,
      S003: false,
      S004: false,
      S005: false,
      // Event flags
      S010: false,
      S011: false,
      S012: false,
      S013: false,
      S014: false,
      S015: false,
      S016: false,
      S017: false,
      S018: false,
      S019: false,
      S020: false,
      S021: false,
    };

    this.todayLog = [];
  }
}
