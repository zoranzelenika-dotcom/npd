import React from 'react';
import { ArrowUpRight, ArrowDownRight, CircleAlert, Leaf, ShieldCheck } from 'lucide-react';
import { commodityForecasts } from '../data';

export function CommodityTrend() {
  return (
    <div className="riskPage">
      <div className="pageTitle">
        <h1>Commodity Price Trend Predictor</h1>
        <p>Supply, demand, planting cycles, and ingredient substitution risk in one forward view.</p>
      </div>

      <section className="conceptLibrary reportLibrary">
        <div className="conceptToolbar">
          <div className="reportLibraryTitle">
            <CircleAlert size={16} />
            <b>Forward price signals</b>
          </div>
          <button className="reportAction">Refresh outlook</button>
        </div>

        <div className="reportMetricGrid">
          <div className="reportMetric"><span>Overall bias</span><b>Moderately inflationary</b></div>
          <div className="reportMetric"><span>Supply pressure</span><b>5 ingredients tight</b></div>
          <div className="reportMetric"><span>Substitution risk</span><b>High for spice-led lines</b></div>
          <div className="reportMetric"><span>Planting lag</span><b>2-4 month impact window</b></div>
        </div>

        <table className="reportTable">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Outlook</th>
              <th>Drivers</th>
              <th>Replacement risk</th>
            </tr>
          </thead>
          <tbody>
            {commodityForecasts.map((item) => (
              <tr key={item.ingredient}>
                <td>
                  <b>{item.ingredient}</b>
                  <small>{item.direction === 'Up' ? 'Price pressure building' : item.direction === 'Down' ? 'Price easing' : 'Near-term stable'}</small>
                </td>
                <td>
                  <span className={'badge ' + (item.direction === 'Up' ? 'statusReview' : item.direction === 'Down' ? 'statusReady' : 'statusDraft')}>
                    {item.outlook}
                  </span>
                </td>
                <td>{item.drivers.join(', ')}</td>
                <td>{item.alternatives.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="briefGrid" style={{ marginTop: 20 }}>
          <div className="brief">
            <h2><ArrowUpRight size={16} /> Ingredients at risk of rising</h2>
            <blockquote>Spice, garlic, and premium extract systems face the most visible pressure from weather, freight, and longer crop cycles.</blockquote>
            <p>Use this view to spot where shelf-stable formulations may need earlier buying, alternate specs, or reformulation work.</p>
          </div>
          <div className="brief">
            <h2><ArrowDownRight size={16} /> Ingredients with easing pressure</h2>
            <blockquote>Bulk organic acids and some commodity soy inputs are showing calmer supply conditions in the short term.</blockquote>
            <p>Those inputs may temporarily absorb cost pressure elsewhere, but substitution patterns still need checking for flavour and label impact.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
