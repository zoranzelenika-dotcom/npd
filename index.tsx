import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { Explore } from './components/Explore';
import { Concepts } from './components/Concepts';
import { Risk } from './components/Risk';
import { CommodityTrend } from './components/CommodityTrend';
import { ReformulationTool } from './components/ReformulationTool';
import { Configure, ConfigWizard } from './components/Configure';
import { makeConcept } from './utils';
import './styles.css';

const seedConcepts = [
  makeConcept({ name:'Spicy Honey Garlic Glaze', brand:'GlazeCrafters', category:'Fat and sauces', group:'Dressings and sauces', claims:['Clean Label','High Protein'], allergens:['soy'], flavours:['spicy','garlic/onion'], ingredients:['garlic','paprika'], list:'Honey, soy sauce, garlic, chilli paste, vinegar, salt.', source:'AI concept', status:'Draft', risk:'Medium' }, 1029),
  makeConcept({ name:'Umami Onion Snack Mix', brand:'Snack Masters', category:'Snacks', group:'Processed meat', claims:['Clean Label'], allergens:['gluten','soy'], flavours:['garlic/onion','salty'], ingredients:['yeast','garlic'], list:'Rice crackers, cashews, roasted onion powder, yeast extract, sunflower oil.', source:'AI concept', status:'Review', risk:'Low' }, 1104),
  makeConcept({ name:'Citrus Paprika Rub', brand:'Spice & Co', category:'Fat and sauces', group:'Dressings and sauces', claims:['Low Sugar','Vegan'], allergens:['allergen free'], flavours:['citrus','spicy'], ingredients:['paprika','citric acid'], list:'Smoked paprika, sea salt, black pepper, dried orange peel, coriander, citric acid.', source:'AI concept', status:'Ready', risk:'Medium' }, 1188)
];

export default function App() {
  const [screen, setScreen] = useState('login');
  const [concepts, setConcepts] = useState(seedConcepts);
  const addProductsToShortlist = (selected) => {
    let added = 0;
    setConcepts((current) => {
      const used = new Set(current.map((concept) => concept.duplicateKey));
      const next = [...current];
      selected.forEach((product, index) => {
        const key = String(product.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!used.has(key)) { next.unshift(makeConcept(product, 1300 + current.length + index)); used.add(key); added += 1; }
      });
      return next;
    });
    return added;
  };
  if (screen === 'login') return <Login onLogin={() => setScreen('wizard')} />;
  if (screen === 'wizard') return <ConfigWizard onComplete={() => setScreen('setting-up')} />;
  if (screen === 'setting-up') return <SetupScreen onDone={() => setScreen('explore')} />;
  return <div className="app"><Header onSignOut={() => setScreen('login')} /><Sidebar screen={screen} setScreen={setScreen} /><main className="content">{screen === 'explore' && <Explore concepts={concepts} onAdd={addProductsToShortlist} onView={() => setScreen('concepts')} />}{screen === 'concepts' && <Concepts concepts={concepts} setConcepts={setConcepts} />}{screen === 'risk' && <Risk />}{screen === 'commodity' && <CommodityTrend />}{screen === 'reformulation' && <ReformulationTool />}{screen === 'configure' && <Configure />}</main></div>;
}

function SetupScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <main className="setupPage">
      <div className="setupCard">
        <div className="setupSpinner" />
        <h1>Setting up your tool</h1>
        <p>Applying your preferences and preparing Explore.</p>
      </div>
    </main>
  );
}
