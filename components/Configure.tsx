import React, { useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const fieldOptions = {
  'Primary Industry / Sector': ['Sauces & Condiments', 'Snacks & Bakery', 'Dairy & Alternatives', 'Ready Meals', 'Plant-Based Foods', 'Beverages', 'Confectionery', 'Meat, Fish & Eggs'],
  'Target Market Focus': ['Global', 'United Kingdom', 'Europe', 'North America', 'Asia Pacific', 'Premium Retail', 'Foodservice', 'Private Label'],
  'Brand Positioning': ['Value', 'Mainstream', 'Premium', 'Health-led', 'Clean Label', 'Sustainable', 'Indulgent', 'Functional Nutrition']
};

const promptItems = [
  'Prioritize Clean Label formulation in AI concepts',
  'Focus on cost-optimized ingredients',
  'Include experimental trends in Explore feed'
];

export function Configure() {
  return <ConfigScreen mode="config" />;
}

export function ConfigWizard({ onComplete }) {
  return <ConfigScreen mode="wizard" onComplete={onComplete} />;
}

function ConfigScreen({ mode, onComplete }) {
  const [form, setForm] = useState({
    'Primary Industry / Sector': ['Sauces & Condiments'],
    'Target Market Focus': ['Global'],
    'Brand Positioning': ['Premium'],
    companyName: 'Global Taste Innovations'
  });
  const [promptPrefs, setPromptPrefs] = useState([true, true, false]);
  const [openField, setOpenField] = useState(null);

  const summary = useMemo(() => [
    { label: 'Industry', value: form['Primary Industry / Sector'].join(', ') || 'None selected' },
    { label: 'Market', value: form['Target Market Focus'].join(', ') || 'None selected' },
    { label: 'Positioning', value: form['Brand Positioning'].join(', ') || 'None selected' }
  ], [form]);
  const promptSummary = useMemo(() => {
    const active = promptPrefs.reduce((count, value) => count + (value ? 1 : 0), 0);
    return [
      { label: 'Prompt preferences', value: `${active} of ${promptPrefs.length} active` },
      { label: 'Explorer feed', value: promptPrefs[2] ? 'Experimental trends included' : 'Experimental trends hidden' },
      { label: 'Saved state', value: mode === 'wizard' ? 'Ready to continue' : 'Editable anytime' }
    ];
  }, [mode, promptPrefs]);

  const saveLabel = mode === 'wizard' ? 'Continue' : 'Save Configuration';
  const title = mode === 'wizard' ? 'Welcome to Food Innovate' : 'System Configuration';
  const subtitle = mode === 'wizard'
    ? 'Let’s set up the workspace so trends, AI prompts, and market signals start in the right place.'
    : 'Set up your company profile to tailor trends, AI prompts, and market signals.';

  const save = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className={'config ' + (mode === 'wizard' ? 'configWizard' : '')}>
      <div className="configHeader">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <section className="configCard">
        <div className="configCardHeader">
          <h2>Company Profile</h2>
          {mode === 'wizard' && <p className="wizardIntro">These choices can all be changed later from Configure.</p>}
        </div>
        <div className="configGrid">
          <MultiSelectField
            label="Primary Industry / Sector"
            value={form['Primary Industry / Sector']}
            open={openField === 'Primary Industry / Sector'}
            onToggle={() => setOpenField(openField === 'Primary Industry / Sector' ? null : 'Primary Industry / Sector')}
            onChange={(value) => setForm((current) => ({ ...current, 'Primary Industry / Sector': value }))}
          />
          <MultiSelectField
            label="Target Market Focus"
            value={form['Target Market Focus']}
            open={openField === 'Target Market Focus'}
            onToggle={() => setOpenField(openField === 'Target Market Focus' ? null : 'Target Market Focus')}
            onChange={(value) => setForm((current) => ({ ...current, 'Target Market Focus': value }))}
          />
          <MultiSelectField
            label="Brand Positioning"
            value={form['Brand Positioning']}
            open={openField === 'Brand Positioning'}
            onToggle={() => setOpenField(openField === 'Brand Positioning' ? null : 'Brand Positioning')}
            onChange={(value) => setForm((current) => ({ ...current, 'Brand Positioning': value }))}
          />
          <label className="uiField">
            <span className="uiLabel">Company Name</span>
            <input
              className="uiInput"
              placeholder="Global Taste Innovations"
              value={form.companyName}
              onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
            />
          </label>
        </div>
        <hr />
        <h3>Prompt Preferences</h3>
        <div className="promptPrefsGrid">
          <div className="toggleStack">
            {promptItems.map((item, index) => (
              <label className="uiToggleRow" key={item}>
                <input
                  type="checkbox"
                  checked={promptPrefs[index]}
                  onChange={(event) => setPromptPrefs((current) => current.map((value, i) => i === index ? event.target.checked : value))}
                />
                <span className="uiSwitch" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <div className="promptSummaryPanel">
            {promptSummary.map((item) => (
              <div className="summaryItem" key={item.label}>
                <span>{item.label}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="configSummary">
          {summary.map((item) => (
            <div className="summaryItem" key={item.label}>
              <span>{item.label}</span>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
        {mode === 'wizard' && (
          <p className="wizardOutro">You can revise any of this later in Configure, after you get a feel for the workspace.</p>
        )}
        <footer>
          <button className="uiButton" onClick={() => mode === 'wizard' && onComplete ? onComplete() : null}>Cancel</button>
          <button className="uiButton uiButtonPrimary" onClick={save}>{saveLabel}</button>
        </footer>
      </section>
    </div>
  );
}

function MultiSelectField({ label, value, open, onToggle, onChange }) {
  const options = fieldOptions[label] || [];
  const summary = value.length ? value.join(', ') : 'Select option';
  const toggleOption = (option) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div className="uiField uiMultiField">
      <span className="uiLabel">{label}</span>
      <button
        className={'uiInput uiSelectTrigger ' + (open ? 'isOpen' : '')}
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-expanded={open}
      >
        <span className="uiSelectValue">{summary}</span>
        <ChevronDown className="uiControlIcon" size={16} strokeWidth={2.4} />
      </button>
      {open && (
        <div className="uiDropdown">
          {options.map((option) => (
            <label className="uiDropdownOption" key={option}>
              <input type="checkbox" checked={value.includes(option)} onChange={() => toggleOption(option)} />
              <span className="uiCheckBox">{value.includes(option) && <Check size={12} strokeWidth={3} />}</span>
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
