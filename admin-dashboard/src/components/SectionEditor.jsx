import { useState } from 'react'
import { LOCALES, LOCALE_LABELS } from '../config/sections.js'

function Field({ field, value, onChange }) {
  if (field.type === 'checkbox') {
    return (
      <label className="field field-checkbox">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    )
  }
  if (field.type === 'list') {
    return (
      <label className="field">
        <span>{field.label}</span>
        <textarea
          rows={4}
          value={Array.isArray(value) ? value.join('\n') : ''}
          onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
        />
      </label>
    )
  }
  if (field.multiline) {
    return (
      <label className="field">
        <span>{field.label}</span>
        <textarea rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      </label>
    )
  }
  return (
    <label className="field">
      <span>{field.label}</span>
      <input
        type={field.type === 'number' ? 'number' : 'text'}
        value={value ?? ''}
        onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      />
    </label>
  )
}

function LocaleTabs({ active, onChange }) {
  return (
    <div className="locale-tabs">
      {LOCALES.map((l) => (
        <button key={l} type="button" className={`locale-tab${active === l ? ' active' : ''}`} onClick={() => onChange(l)}>
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  )
}

function ObjectI18nEditor({ config, value, onChange }) {
  const [locale, setLocale] = useState('id')
  const localeValue = value?.[locale] || {}
  const setField = (key, v) => {
    onChange({ ...value, [locale]: { ...localeValue, [key]: v } })
  }
  return (
    <div className="section-card">
      <LocaleTabs active={locale} onChange={setLocale} />
      <div className="field-grid">
        {config.fields.map((f) => (
          <Field key={f.key} field={f} value={localeValue[f.key]} onChange={(v) => setField(f.key, v)} />
        ))}
      </div>
    </div>
  )
}

function ArrayItemEditor({ config, item, onChange }) {
  const [locale, setLocale] = useState('id')
  const i18n = item.i18n || {}
  const localeValue = i18n[locale] || {}
  const setExtra = (key, v) => onChange({ ...item, [key]: v })
  const setI18nField = (key, v) => onChange({ ...item, i18n: { ...i18n, [locale]: { ...localeValue, [key]: v } } })
  return (
    <div className="section-card">
      {config.extraFields.length > 0 && (
        <div className="field-grid">
          {config.extraFields.map((f) => (
            <Field key={f.key} field={f} value={item[f.key]} onChange={(v) => setExtra(f.key, v)} />
          ))}
        </div>
      )}
      <LocaleTabs active={locale} onChange={setLocale} />
      <div className="field-grid">
        {config.i18nFields.map((f) => (
          <Field key={f.key} field={f} value={localeValue[f.key]} onChange={(v) => setI18nField(f.key, v)} />
        ))}
      </div>
    </div>
  )
}

function ArrayI18nEditor({ config, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const updateItem = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)))
  const removeItem = (i) => {
    if (!window.confirm('Hapus item ini?')) return
    onChange(items.filter((_, idx) => idx !== i))
  }
  const addItem = () => {
    const blankI18n = Object.fromEntries(LOCALES.map((l) => [l, {}]))
    const blankExtra = Object.fromEntries(config.extraFields.map((f) => [f.key, f.type === 'checkbox' ? false : '']))
    onChange([...items, { ...blankExtra, i18n: blankI18n }])
  }
  return (
    <div className="section-list">
      {items.map((item, i) => (
        <div className="section-item" key={i}>
          <div className="section-item-head">
            <span>Item #{i + 1}</span>
            <button type="button" className="btn-icon-del" onClick={() => removeItem(i)}>Hapus</button>
          </div>
          <ArrayItemEditor config={config} item={item} onChange={(next) => updateItem(i, next)} />
        </div>
      ))}
      <button type="button" className="btn-add" onClick={addItem}>+ Tambah Item</button>
    </div>
  )
}

function ArrayPlainEditor({ config, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const updateItem = (i, key, v) => onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)))
  const removeItem = (i) => {
    if (!window.confirm('Hapus item ini?')) return
    onChange(items.filter((_, idx) => idx !== i))
  }
  const addItem = () => onChange([...items, Object.fromEntries(config.fields.map((f) => [f.key, '']))])
  return (
    <div className="section-list">
      {items.map((item, i) => (
        <div className="section-item" key={i}>
          <div className="section-item-head">
            <span>Item #{i + 1}</span>
            <button type="button" className="btn-icon-del" onClick={() => removeItem(i)}>Hapus</button>
          </div>
          <div className="section-card">
            <div className="field-grid">
              {config.fields.map((f) => (
                <Field key={f.key} field={f} value={item[f.key]} onChange={(v) => updateItem(i, f.key, v)} />
              ))}
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={addItem}>+ Tambah Item</button>
    </div>
  )
}

export function SectionEditor({ config, value, onChange }) {
  if (config.kind === 'object-i18n') return <ObjectI18nEditor config={config} value={value} onChange={onChange} />
  if (config.kind === 'array-i18n') return <ArrayI18nEditor config={config} value={value} onChange={onChange} />
  if (config.kind === 'array-plain') return <ArrayPlainEditor config={config} value={value} onChange={onChange} />
  return null
}
