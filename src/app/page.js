'use client'
import { useState } from 'react'

export default function Page() {
  const [loading, setLoading]     = useState(false)
  const [result, setResult]       = useState(null)
  const [error, setError]         = useState(null)

  async function lancerSimulationCash() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/simulate/cash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          montant_investissement: 20000,
          versement_initial       : 20000,
          versement_programme     : 200,
          duree_simulation        : 120,
          taux_distribution       : 0.045,
          taux_revalorisation     : 0.01,
          frais_souscription      : 8,
          mode_versement_dividendes: 'Trimestriel',
          reinvestir_dividendes   : false,
          tmi                     : 30,
          investissement_etranger  : false,
          pourcentage_etranger    : 0,
          activer_inflation       : true,
          taux_inflation          : 0.02,
          taux_actualisation      : 0.05,
          delai_jouissance        : 3
        })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setResult(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Simulateur SCPI (Cash)</h1>
      <button onClick={lancerSimulationCash} disabled={loading}>
        {loading ? 'Chargement…' : 'Lancer la simulation'}
      </button>

      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {result && (
        <section style={{ marginTop: 20 }}>
          <h2>Résultat brut (JSON)</h2>
          <pre
            style={{
              background: '#f0f0f0',
              padding: 10,
              borderRadius: 4,
              overflowX: 'auto'
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </main>
  )
}
