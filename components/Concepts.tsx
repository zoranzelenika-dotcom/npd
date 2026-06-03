import React, { useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ChevronsUpDown, FileText, MessageSquareText, Send, Search, X } from 'lucide-react';

const editedOrder = {
  'Just now': 4,
  Today: 3,
  Yesterday: 2
};

export function Concepts({ concepts, setConcepts }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [sort, setSort] = useState({ key: 'edited', dir: 'desc' });
  const [selected, setSelected] = useState([]);
  const [openConcept, setOpenConcept] = useState(null);

  const value = (concept, key) => {
    if (key === 'risk') return { High: 3, Medium: 2, Low: 1 }[concept.risk] || 0;
    if (key === 'edited') return editedOrder[concept.lastEdited] || 1;
    return {
      id: concept.id,
      name: concept.name,
      status: concept.status,
      source: concept.source,
      category: concept.group,
      claims: concept.claims.join(', ')
    }[key] || '';
  };

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return concepts
      .filter((concept) => (status === 'All statuses' || concept.status === status) && (!q || [concept.name, concept.brand, concept.category, concept.group, concept.list, ...concept.claims, ...concept.ingredients].join(' ').toLowerCase().includes(q)))
      .sort((a, b) => {
        const av = value(a, sort.key);
        const bv = value(b, sort.key);
        const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sort.dir === 'asc' ? result : -result;
      });
  }, [concepts, query, status, sort]);

  const head = (label, key) => {
    const active = sort.key === key;
    const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;
    const nextDir = active && sort.dir === 'asc' ? 'desc' : 'asc';

    return (
      <th>
        <button
          className={'sortHeader ' + (active ? 'sortHeaderActive' : '')}
          onClick={() => setSort((current) => current.key === key ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })}
          aria-label={`Sort by ${label} ${nextDir === 'asc' ? 'ascending' : 'descending'}`}
        >
          {label}
          <Icon className="sortIcon" size={13} strokeWidth={2.4} />
        </button>
      </th>
    );
  };

  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const clear = () => setSelected([]);
  const openDetail = (concept) => {
    setOpenConcept(concept);
  };
  const deleteSelected = () => {
    setConcepts((current) => current.filter((item) => !selected.includes(item.id)));
    clear();
  };
  const duplicateSelected = () => {
    setConcepts((current) => [
      ...current
        .filter((item) => selected.includes(item.id))
        .map((item, index) => ({ ...item, id: 'CPT-D' + (Date.now() + index).toString().slice(-5), name: item.name + ' copy', status: 'Draft', duplicateKey: item.duplicateKey + 'copy' + index })),
      ...current
    ]);
    clear();
  };

  return (
    <div className="conceptsPage">
      <div className="pageTitle">
        <h1>Concept Shortlist</h1>
        <p>Search, filter, manage and edit shortlisted concepts.</p>
      </div>
      {openConcept && (
        <ConceptDetail
          key={openConcept.id}
          concept={openConcept}
          onClose={() => {
            setOpenConcept(null);
          }}
          setConcepts={setConcepts}
        />
      )}
      {!openConcept && (
        <section className="conceptLibrary">
          <div className="conceptToolbar">
            <div className="conceptSearch">
              <Search size={16} />
              <input placeholder="Search concepts, brands, ingredients..." value={query} onChange={(event) => setQuery(event.target.value)} />
              {query && <button className="conceptSearchClear" onClick={() => setQuery('')}><X size={14} /></button>}
            </div>
            <div className="statusSelectWrap">
              <select className="statusSelect" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option>All statuses</option>
                <option>Draft</option>
                <option>Review</option>
                <option>Ready</option>
              </select>
              <ChevronDown className="statusSelectIcon" size={16} />
            </div>
          </div>
          {selected.length > 0 && (
            <div className="bulkBar">
              <b>{selected.length} selected</b>
              <div className="bulkActions">
                <button onClick={duplicateSelected}>Duplicate</button>
                <button onClick={deleteSelected}>Delete</button>
                <button onClick={clear}>Clear</button>
              </div>
              <button className="reportAction">Generate report <FileText size={14} /></button>
            </div>
          )}
          <table className="conceptTable">
            <thead>
              <tr>
                <th className="selectCol"></th>
                {head('Name', 'name')}
                {head('Status', 'status')}
                {head('Source', 'source')}
                {head('Category', 'category')}
                {head('Claims', 'claims')}
                {head('Risk', 'risk')}
                {head('Last edited', 'edited')}
              </tr>
            </thead>
            <tbody>
              {rows.map((concept) => (
                <tr key={concept.id} className={selected.includes(concept.id) ? 'rowSelected' : ''}>
                  <td className="selectCol"><input type="checkbox" checked={selected.includes(concept.id)} onChange={() => toggle(concept.id)} /></td>
                  <td className="viewerItemCell">
                    <button
                      className="conceptName"
                      onPointerDown={() => openDetail(concept)}
                      onClick={() => openDetail(concept)}
                      onDoubleClick={() => openDetail(concept)}
                    >
                      {concept.name}
                    </button>
                    <small>{concept.brand}</small>
                  </td>
                  <td><span className={'badge status' + concept.status}>{concept.status}</span></td>
                  <td><span className="badge sourceBadge">{concept.source}</span></td>
                  <td>{concept.group}</td>
                  <td>{concept.claims.slice(0, 2).join(', ') || '-'}</td>
                  <td><span className={'riskBadge risk' + concept.risk}>{concept.risk}</span></td>
                  <td className="rowMetaCell">
                    <span>{concept.lastEdited}</span>
                    {concept.id === 'CPT-1029' && <span className="rowCommentBadge"><MessageSquareText size={13} /> 1</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

function ConceptDetail({ concept, onClose, setConcepts }) {
  const [draft, setDraft] = useState(concept);
  const [tab, setTab] = useState('summary');
  const [reply, setReply] = useState('');
  const save = () => {
    setConcepts((current) => current.map((item) => item.id === concept.id ? { ...draft, lastEdited: 'Just now' } : item));
    onClose();
  };
  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'supply', label: 'Supply chain' },
    { id: 'operations', label: 'Operations' },
    { id: 'technical', label: 'Technical' }
  ];

  const tabBody = {
    summary: (
      <>
        <label className="uiField">
          <span className="uiLabel">Name</span>
          <input className="uiInput" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        </label>
        <label className="uiField">
          <span className="uiLabel">Brand</span>
          <input className="uiInput" value={draft.brand} onChange={(event) => setDraft({ ...draft, brand: event.target.value })} />
        </label>
        <label className="uiField">
          <span className="uiLabel">Ingredient list</span>
          <textarea className="uiInput" value={draft.list} onChange={(event) => setDraft({ ...draft, list: event.target.value })} />
        </label>
        <div className="detailMetaRow">
          <span>{draft.category}</span>
          <span>{draft.group}</span>
          <span>{draft.risk} risk</span>
        </div>
        <section className="detailSection">
          <h3>Composition</h3>
          <div className="detailTextBlock">
            <p>{draft.list}</p>
            <p>The concept leans into a sweet-savoury glaze profile with familiar garlic and soy notes, which keeps it close to mainstream expectations while still reading as a premium product.</p>
          </div>
        </section>
        <section className="detailSection">
          <h3>Claims</h3>
          <p>{draft.claims.join(', ') || 'No claims'}</p>
        </section>
        <section className="detailSection">
          <h3>Allergens</h3>
          <p>{draft.allergens.join(', ') || 'No allergens'}</p>
        </section>
      </>
    ),
    supply: (
      <>
        <div className="detailTopline">
          <p>How this could be sourced</p>
          <button className="uiButton uiButtonPrimary"><Send size={14} /> Share for Review</button>
        </div>
        <section className="detailSection">
          <h3>Ingredient procurement</h3>
          <p>Honey, soy sauce, garlic, chilli paste, vinegar, and salt can be bought through standard ambient ingredient suppliers with dual sourcing for sweeteners, sauces, and seasonings.</p>
        </section>
        <section className="detailSection">
          <h3>Supply notes</h3>
          <p>Best fit is a supplier mix with liquid ingredients from one network and dry seasonings from another. Soy and honey should be checked for origin, allergen statements, and consistency across lots.</p>
        </section>
        <section className="detailSection">
          <h3>Packaging risk</h3>
          <p>Ambient packaging is straightforward, but the process should account for viscosity control and seal integrity because the formula reads like a pourable glaze.</p>
        </section>
      </>
    ),
    operations: (
      <>
        <div className="detailTopline">
          <p>How it might be made</p>
          <button className="uiButton uiButtonPrimary"><Send size={14} /> Share for Review</button>
        </div>
        <section className="detailSection">
          <h3>Process outline</h3>
          <p>Batch dry seasonings first, hydrate the sauce base, then blend honey and vinegar under controlled heat. Add garlic and chilli late in the process to protect aroma and reduce overcooking.</p>
        </section>
        <section className="detailSection">
          <h3>Operations considerations</h3>
          <p>Needs basic mixing, heat hold, and fill controls. The main operational watch-outs are viscosity drift, surface foaming, and keeping garlic particulate evenly suspended.</p>
        </section>
        <section className="detailSection">
          <h3>Scale-up notes</h3>
          <p>During scale-up, align batch temperature and hold time so sweetness, acidity, and savoury notes stay balanced across runs.</p>
        </section>
      </>
    ),
    technical: (
      <>
        <div className="detailTopline">
          <p>QA and safety focus</p>
          <button className="uiButton uiButtonPrimary"><Send size={14} /> Share for Review</button>
        </div>
        <div className="reviewLayout">
          <div className="reviewContent">
            <section className="detailSection">
              <h3>Allergen review</h3>
              <p>Soy is the primary declared allergen. If supplier ingredients contain shared-line traces, the label set should be checked against facility statements before approval.</p>
            </section>
            <section className="detailSection">
              <h3>Micro and shelf life</h3>
              <p>Acid balance and water activity will drive safety and shelf-life performance. The formula should be validated for yeast, mould, and general ambient stability after packaging.</p>
            </section>
            <section className="detailSection">
              <h3>QA checkpoints</h3>
              <p>Check colour consistency, garlic distribution, pH, fill weight, and seal integrity at release. If the product is positioned as premium, the sensory profile should remain stable between lots.</p>
            </section>
          </div>
          <aside className="reviewThread">
            <div className="reviewThreadHeader">
              <span><MessageSquareText size={12} /> Review comment</span>
              <b>Regulatory Affairs</b>
            </div>
            <p>We should flag soy clearly and confirm whether the honey supplier introduces any label or origin language that needs to be carried through to final packaging artwork.</p>
            <div className="reviewReply">
              <input
                className="uiInput"
                placeholder="Reply..."
                value={reply}
                onChange={(event) => setReply(event.target.value)}
              />
              <button className="uiButton uiButtonPrimary">Reply</button>
            </div>
          </aside>
        </div>
      </>
    )
  }[tab];

  return (
    <section className="conceptDetail">
      <div className="drawerHeader">
        <button className="backButton" onClick={onClose} aria-label="Back to list">
          <ArrowLeft size={18} />
        </button>
        <div className="drawerHeaderTitle">
          <b>{concept.id}</b>
          <h2>{draft.name}</h2>
        </div>
        <button className="closeButton" onClick={onClose}>x</button>
      </div>
      <div className="detailTabs" role="tablist" aria-label="Concept detail tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            className={'detailTab ' + (tab === item.id ? 'active' : '')}
            onClick={() => setTab(item.id)}
          >
            {item.id === 'technical' && <MessageSquareText size={14} strokeWidth={2.4} className="detailTabIcon" />}
            {item.label}
          </button>
        ))}
      </div>
      <div className="detailBody">
        {tabBody}
      </div>
      {tab === 'summary' ? (
        <footer className="detailFooter">
          <button className="uiButton" onClick={onClose}>Back</button>
          <button className="uiButton uiButtonPrimary" onClick={save}>Save changes</button>
        </footer>
      ) : (
        <footer className="detailFooter">
          <button className="uiButton" onClick={onClose}>Back</button>
        </footer>
      )}
    </section>
  );
}
