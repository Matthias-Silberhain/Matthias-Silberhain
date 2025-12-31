// assets/js/bewertungen.js

class VereintesBewertungssystem {
  constructor() {
    this.currentBuch = null;
    this.currentRating = 0;
    this.selectedComments = [];
    this.init();
  }
  
  init() {
    this.loadLocalReviews();
    this.setupEventListeners();
  }
  
  loadLocalReviews() {
    try {
      const saved = localStorage.getItem('buchbewertungen');
      if (saved) {
        this.allReviews = JSON.parse(saved);
      } else {
        this.allReviews = {
          derlangewegindiefinsternis: { ratings: [], comments: {}, customComments: [] },
          machtunduntergang: { ratings: [], comments: {}, customComments: [] },
          blutundkrone: { ratings: [], comments: {}, customComments: [] }
        };
      }
    } catch (e) {
      console.error('Fehler beim Laden der Bewertungen:', e);
    }
  }
  
  saveReview(buchId, rating, comments = [], customComment = '') {
    // 1. Lokal speichern
    this.allReviews[buchId].ratings.push(rating);
    
    comments.forEach(comment => {
      if (!this.allReviews[buchId].comments[comment]) {
        this.allReviews[buchId].comments[comment] = 0;
      }
      this.allReviews[buchId].comments[comment]++;
    });
    
    if (customComment) {
      this.allReviews[buchId].customComments.push(customComment);
    }
    
    localStorage.setItem('buchbewertungen', JSON.stringify(this.allReviews));
    
    // 2. Index-Stats informieren (falls vorhanden)
    if (window.silberhainStats && typeof window.silberhainStats.incrementReviews === 'function') {
      window.silberhainStats.incrementReviews(rating);
      console.log('✅ Bewertung an Index-Stats übermittelt');
    }
    
    // 3. Gesamtbewertungen aktualisieren
    this.updateGesamtbewertungen();
    
    return true;
  }
  
  getAverageRating(buchId) {
    const ratings = this.allReviews[buchId]?.ratings || [];
    if (ratings.length === 0) return 0;
    
    const sum = ratings.reduce((a, b) => a + b, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }
  
  getStarRating(buchId) {
    const avg = this.getAverageRating(buchId);
    const fullStars = Math.floor(avg);
    const hasHalfStar = (avg % 1) >= 0.5;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (hasHalfStar) stars += '☆';
    for (let i = stars.length; i < 5; i++) stars += '☆';
    
    return stars;
  }
  
  getTopComments(buchId, limit = 3) {
    const comments = this.allReviews[buchId]?.comments || {};
    return Object.entries(comments)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([text, count]) => ({ text, count }));
  }
  
  setupEventListeners() {
    // Diese Methoden werden von werke.html aufgerufen
    console.log('✅ Vereintes Bewertungssystem initialisiert');
  }
  
  updateGesamtbewertungen() {
    // Diese Methode aktualisiert die Anzeige
    // Wird von werke.html implementiert
  }
}

// Global verfügbar machen
window.VereintesBewertungssystem = VereintesBewertungssystem;
window.vereintesBewertungssystem = new VereintesBewertungssystem();
