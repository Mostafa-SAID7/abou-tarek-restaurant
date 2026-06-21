<template>
  <div v-if="mode === 'grid'" class="skeleton-grid" aria-busy="true" aria-label="Loading branches…">
    <div v-for="n in count" :key="n" class="card sk-card">
      <div class="sk-row">
        <span class="shimmer sk-badge-lg"></span>
        <span class="shimmer sk-icon-sm"></span>
      </div>
      <div class="sk-col-sm">
        <span class="shimmer sk-txt-wide"></span>
        <span class="shimmer sk-txt-mid"></span>
      </div>
      <div class="sk-details">
        <div v-for="d in 3" :key="d" class="sk-row sk-row-sm">
          <span class="shimmer sk-detail-icon"></span>
          <span class="shimmer sk-txt-sm" :style="`width:${58 + d * 8}%`"></span>
        </div>
      </div>
      <div class="sk-row sk-row-sm">
        <span class="shimmer sk-flex-btn"></span>
        <span class="shimmer sk-flex-btn"></span>
      </div>
    </div>
  </div>

  <div v-else class="sk-table" aria-busy="true" aria-label="Loading branches…">
    <div class="sk-table-head">
      <span v-for="w in ['28%','12%','15%','20%','5%','15%']" :key="w"
        class="shimmer sk-head-cell" :style="`width:${w}`"></span>
    </div>
    <div v-for="n in count" :key="n" class="sk-table-row">
      <div class="sk-name-col">
        <span class="shimmer sk-name-text"></span>
        <span class="shimmer sk-name-badge"></span>
      </div>
      <span v-for="w in ['12%','15%','20%','5%']" :key="w"
        class="shimmer sk-body-cell" :style="`width:${w}`"></span>
      <div class="sk-action-col">
        <span class="shimmer sk-action-btn"></span>
        <span class="shimmer sk-action-btn"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mode:  { type: String, default: 'grid' },
  count: { type: Number, default: 6 }
})
</script>

<style scoped>
@keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; } }

/* ── Grid layout ── */
.skeleton-grid {
  display: grid;
  grid-template-columns: var(--grid-cards);
  gap: var(--sp-4);
}

.sk-card {
  padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-4);
  animation: fadeIn .35s ease;
}

/* ── Shared row/col helpers ── */
.sk-row { display: flex; align-items: center; justify-content: space-between; }
.sk-row-sm { gap: var(--sp-2, 8px); }

.sk-col-sm { display: flex; flex-direction: column; gap: var(--sp-2, 8px); }

/* ── Grid shimmer shapes ── */
.sk-badge-lg   { width: 72px; height: 22px; border-radius: var(--r-pill, 9999px); }
.sk-icon-sm    { width: 22px; height: 22px; border-radius: var(--r-pill, 9999px); }
.sk-txt-wide   { width: 78%; height: 15px; }
.sk-txt-mid    { width: 54%; height: 12px; }
.sk-txt-sm     { height: 12px; } /* width supplied dynamically per row */
.sk-detail-icon { width: 16px; height: 13px; flex-shrink: 0; }
.sk-flex-btn   { flex: 1; height: 30px; border-radius: var(--r-lg, 8px); }

/* ── Details block ── */
.sk-details {
  display: flex; flex-direction: column; gap: var(--sp-2);
  background: var(--bg); border-radius: var(--r-lg); padding: var(--sp-3);
}
.sk-details .sk-row { justify-content: flex-start; }

/* ── Table layout ── */
.sk-table {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-2xl); overflow: hidden;
}
.sk-table-head {
  display: flex; gap: var(--sp-3); align-items: center;
  padding: var(--sp-3) var(--sp-5);
  background: var(--bg); border-bottom: 1px solid var(--border);
}
.sk-table-row {
  display: flex; gap: var(--sp-3); align-items: center;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
  animation: fadeIn .35s ease;
}
.sk-table-row:last-child { border-bottom: none; }

/* ── Table shimmer shapes ── */
.sk-head-cell  { height: 12px; }  /* width supplied dynamically */
.sk-body-cell  { height: 12px; }  /* width supplied dynamically */
.sk-name-col   { width: 28%; display: flex; flex-direction: column; gap: var(--sp-1, 4px); }
.sk-name-text  { width: 88%; height: 13px; }
.sk-name-badge { width: 50%; height: 10px; border-radius: var(--r-pill, 9999px); }
.sk-action-col { width: 15%; display: flex; gap: var(--sp-2, 8px); }
.sk-action-btn { flex: 1; height: 26px; border-radius: var(--r-md, 6px); }

@media (max-width: 640px) {
  .skeleton-grid { grid-template-columns: 1fr; }
  .sk-table { display: none; }
}
</style>
