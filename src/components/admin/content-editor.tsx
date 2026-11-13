import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useId } from 'react';
const labels: Record<string, string> = { short: 'Summary', intro: 'Introduction', phoneHref: 'Telephone link', commonFaqs: 'FAQs', cta: 'Button', kicker: 'Small heading', lines: 'Headline lines', copy: 'Description', meta: 'Category', delaySeconds: 'Popup delay (seconds)', formHeading: 'Form title', slug: 'URL name', body: 'Article text', heroes: 'Page headings' };
function newItem(path: string, example: unknown) {
 const key = path.split('.').at(-1);
 if (key === 'questions' || key === 'commonFaqs') return ['New question', 'Answer'];
 if (key === 'curriculum') return { title: 'New module', topics: ['Topic'] };
 if (key === 'projects') return { title: 'New project', image: '/assets/project.jpg', meta: 'Category' };
 if (key === 'articles') return { slug: 'new-article', title: 'New article', excerpt: 'Summary', date: new Date().toISOString().slice(0, 10), body: '' };
 if (key === 'programs' && example && typeof example === 'object') return { ...structuredClone(example), slug: `new-course-${Date.now()}`, title: 'New course' };
 return typeof example === 'object' && example !== null ? structuredClone(example) : 'New item';
}
export function ContentEditor({ value, onChange, label = 'Content', path = '' }: { value: unknown; onChange: (v: unknown) => void; label?: string; path?: string }) {
 const fieldId = useId();
 if (typeof value === 'boolean') return <label className="flex items-center gap-3 py-3 text-sm font-semibold"><input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />{label}</label>;
 if (typeof value === 'number') return <label className="grid gap-2 text-sm font-semibold">{label}<Input type="number" value={value} onChange={e => onChange(Number(e.target.value))} /></label>;
 if (typeof value === 'string') return <div className="grid gap-2 text-sm font-semibold"><label htmlFor={fieldId}>{label}</label>{value.length > 100 || /intro|copy|short|body|heading|notes/.test(path) ? <Textarea id={fieldId} rows={path.includes('body') ? 10 : 3} value={value} onChange={e => onChange(e.target.value)} /> : <Input id={fieldId} value={value} onChange={e => onChange(e.target.value)} />}{/image$/.test(path) && value && <img src={value} alt="Selected image" className="mt-1 max-h-36 max-w-full rounded-md object-contain" />}</div>;
 if (Array.isArray(value)) return <div className="space-y-3"><p className="text-sm font-bold">{label}</p>{value.map((v, i) => <details key={i} open={typeof v !== 'object' || Array.isArray(v)} className="border-b border-border pb-4"><summary className="cursor-pointer py-3 font-semibold">{typeof v === 'object' && v && 'title' in v ? String(v.title) : `${label} ${i + 1}`}</summary><div className="space-y-4 pl-3"><ContentEditor value={v} label={`${label} ${i + 1}`} path={`${path}.${i}`} onChange={next => onChange(value.map((old, j) => j === i ? next : old))} />{!['slides', 'lines', 'questions', 'commonFaqs'].includes(path.split('.').at(-1) ?? '') && <Button type="button" variant="ghost" size="sm" onClick={() => onChange(value.filter((_, j) => i !== j))}><Trash2 className="size-4" />Remove</Button>}</div></details>)}{!['slides', 'lines'].includes(path.split('.').at(-1) ?? '') && !/^\d+$/.test(path.split('.').at(-1) ?? '') && <Button variant="outline" size="sm" type="button" onClick={() => onChange([...value, newItem(path, value[0])])}><Plus className="size-4" />Add {label.toLowerCase()}</Button>}</div>;
 if (value && typeof value === 'object') return <div className="grid gap-5">{Object.entries(value).map(([key, v]) => <ContentEditor key={key} label={labels[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())} value={v} path={`${path}.${key}`} onChange={next => onChange({ ...value, [key]: next })} />)}</div>;
 return null;
}