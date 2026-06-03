import React from 'react';
import { RotateCcw, ScanSearch, SlidersHorizontal, Sparkles } from 'lucide-react';
import { reformulationIdeas } from '../data';

export function ReformulationTool() {
  return (
    <div className="riskPage">
      <div className="pageTitle">
        <h1>Reformulation Tool</h1>
        <p>Explore replacement ingredients, cost drivers, stability, flavour, and texture tradeoffs for market products.</p>
      </div>

      <section className="conceptLibrary reportLibrary">
        <div className="conceptToolbar">
          <div className="reportLibraryTitle">
            <ScanSearch size={16} />
            <b>Alternative ingredient search</b>
          </div>
          <button className="reportAction">Run comparison</button>
        </div>

        <div className="reportMetricGrid">
          <div className="reportMetric"><span>Focus</span><b>Company reformulation</b></div>
          <div className="reportMetric"><span>Cost driver</span><b>Ingredient inflation</b></div>
          <div className="reportMetric"><span>Stability</span><b>Heat, pH, and water activity</b></div>
          <div className="reportMetric"><span>Use case</span><b>Supplier and competitor view</b></div>
        </div>

        <table className="reportTable">
          <thead>
            <tr>
              <th>Product / use case</th>
              <th>Ingredient to replace</th>
              <th>Suggested swap</th>
              <th>Expected impact</th>
            </tr>
          </thead>
          <tbody>
            {reformulationIdeas.map((item) => (
              <tr key={item.product}>
                <td>
                  <b>{item.product}</b>
                  <small>{item.reason}</small>
                </td>
                <td>{item.ingredient}</td>
                <td>{item.replacement}</td>
                <td>{item.effects}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="briefGrid" style={{ marginTop: 20 }}>
          <div className="brief">
            <h2><SlidersHorizontal size={16} /> Reformulation levers</h2>
            <blockquote>Cost, shelf life, flavour intensity, and texture are the four controls that move most often during ingredient substitution.</blockquote>
            <p>Generic examples here mirror what a product team would use when the goal is to preserve performance while improving supply resilience or cost.</p>
          </div>
          <div className="brief">
            <h2><Sparkles size={16} /> Supplier intelligence</h2>
            <blockquote>Ingredient suppliers can use the same view to see what adjacent materials are starting to displace their share.</blockquote>
            <p>That makes the screen useful both for defense of current formulations and for prospecting into adjacent replacement systems.</p>
          </div>
        </div>

        <div className="reportActionsBlock">
          <h3>Generic decision prompts</h3>
          <ul>
            <li>Does the replacement keep the flavour arc close enough to the current market product?</li>
            <li>Will the substitute behave under the same process and storage conditions?</li>
            <li>Does the swap reduce cost without creating a new QA or label problem?</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
