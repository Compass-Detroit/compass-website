import React, { useState, useEffect } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import { 
  FaHeading, FaParagraph, FaImage, FaUserTie, 
  FaCalendarAlt, FaLink, FaMinus, FaShareAlt,
  FaArrowUp, FaArrowDown, FaTrash, FaDesktop, FaMobileAlt, FaSave, FaFolderOpen
} from 'react-icons/fa'

const BLOCK_TYPES = [
  { id: 'header', icon: <FaHeading />, label: 'Header' },
  { id: 'text', icon: <FaParagraph />, label: 'Text' },
  { id: 'image', icon: <FaImage />, label: 'Image' },
  { id: 'speaker', icon: <FaUserTie />, label: 'Speaker Spotlight' },
  { id: 'event', icon: <FaCalendarAlt />, label: 'Event' },
  { id: 'button', icon: <FaLink />, label: 'Button' },
  { id: 'divider', icon: <FaMinus />, label: 'Divider' },
  { id: 'social', icon: <FaShareAlt />, label: 'Social Links' }
]

const TEMPLATES = [
  {
    id: 't1',
    name: 'Event Announcement',
    blocks: [
      { id: 'b1', type: 'header', content: { title: 'Upcoming Event', subtitle: 'Join us next week', bg: '#efb403' } },
      { id: 'b2', type: 'event', content: { name: 'Detroit Tech Meetup', date: 'Oct 15, 2026', location: 'Downtown Detroit', cta: 'RSVP Now' } },
      { id: 'b3', type: 'button', content: { text: 'View All Events', url: '#', color: '#6366f1' } },
      { id: 'b4', type: 'social', content: {} }
    ]
  },
  {
    id: 't2',
    name: 'Speaker Spotlight',
    blocks: [
      { id: 'b1', type: 'header', content: { title: 'Speaker Spotlight', subtitle: 'Meet our featured speaker', bg: '#6366f1' } },
      { id: 'b2', type: 'speaker', content: { name: 'Jane Doe', title: 'Senior Engineer', avatar: 'https://i.pravatar.cc/150?img=47' } },
      { id: 'b3', type: 'text', content: { text: 'Jane will be talking about the future of web development.' } },
      { id: 'b4', type: 'button', content: { text: 'Register to Watch', url: '#', color: '#efb403' } }
    ]
  },
  {
    id: 't3',
    name: 'Community Update',
    blocks: [
      { id: 'b1', type: 'header', content: { title: 'Community Update', subtitle: 'Monthly newsletter', bg: '#00C605' } },
      { id: 'b2', type: 'text', content: { text: 'Here are the latest updates from our community this month.' } },
      { id: 'b3', type: 'image', content: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', alt: 'Community gathering', caption: 'Last months meetup' } },
      { id: 'b4', type: 'text', content: { text: 'Thank you to everyone who attended!' } },
      { id: 'b5', type: 'social', content: {} }
    ]
  }
]

export default function NewsletterStudioPage() {
  const [subject, setSubject] = useState('Newsletter Subject')
  const [blocks, setBlocks] = useState([])
  const [activeBlock, setActiveBlock] = useState(null)
  const [previewMode, setPreviewMode] = useState('desktop') // desktop, mobile
  const [subscribersCount, setSubscribersCount] = useState(0)

  useEffect(() => {
    const existing = localStorage.getItem('compass_newsletter_subscribers')
    if (existing) {
      try {
        const subs = JSON.parse(existing)
        setSubscribersCount(subs.length)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleAddBlock = (type) => {
    const newBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultContent(type)
    }
    setBlocks([...blocks, newBlock])
    setActiveBlock(newBlock.id)
  }

  const getDefaultContent = (type) => {
    switch(type) {
      case 'header': return { title: 'Header Title', subtitle: 'Subtitle goes here', bg: '#efb403' }
      case 'text': return { text: 'Enter your text here.' }
      case 'image': return { url: 'https://via.placeholder.com/600x300', alt: 'Image', caption: '' }
      case 'speaker': return { name: 'Speaker Name', title: 'Talk Title', avatar: 'https://i.pravatar.cc/150' }
      case 'event': return { name: 'Event Name', date: 'Date & Time', location: 'Location', cta: 'RSVP' }
      case 'button': return { text: 'Click Here', url: 'https://example.com', color: '#00C605' }
      case 'divider': return { style: 'solid', color: '#e5e7eb' }
      case 'social': return {}
      default: return {}
    }
  }

  const handleMoveBlock = (index, dir) => {
    if (index === 0 && dir === -1) return
    if (index === blocks.length - 1 && dir === 1) return
    
    const newBlocks = [...blocks]
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[index + dir]
    newBlocks[index + dir] = temp
    setBlocks(newBlocks)
  }

  const handleDeleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id))
    if (activeBlock === id) setActiveBlock(null)
  }

  const updateBlockContent = (id, newContent) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b))
  }

  const handleSaveDraft = () => {
    const draft = { id: Date.now(), subject, blocks, updatedAt: new Date().toISOString() }
    localStorage.setItem('compass_newsletter_drafts', JSON.stringify([draft]))
    alert('Draft saved!')
  }

  const handleLoadDraft = () => {
    const existing = localStorage.getItem('compass_newsletter_drafts')
    if (existing) {
      try {
        const drafts = JSON.parse(existing)
        if (drafts.length > 0) {
          const draft = drafts[drafts.length - 1]
          setSubject(draft.subject)
          setBlocks(draft.blocks)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      alert('No drafts found.')
    }
  }

  const handleLoadTemplate = (template) => {
    setSubject(template.name)
    // Deep copy to avoid id collisions if loaded multiple times
    setBlocks(JSON.parse(JSON.stringify(template.blocks)).map(b => ({...b, id: `block_${Math.random()}`})))
  }

  const renderBlockPreview = (block) => {
    switch (block.type) {
      case 'header':
        return (
          <div style={{ backgroundColor: block.content.bg }} className="p-8 text-center text-white">
            <h1 className="text-3xl font-bold">{block.content.title}</h1>
            {block.content.subtitle && <p className="mt-2 text-lg opacity-90">{block.content.subtitle}</p>}
          </div>
        )
      case 'text':
        return <div className="px-6 py-4 text-gray-700"><p>{block.content.text}</p></div>
      case 'image':
        return (
          <div className="px-6 py-4 text-center">
            <img src={block.content.url} alt={block.content.alt} className="max-w-full rounded mx-auto" />
            {block.content.caption && <p className="mt-2 text-sm text-gray-500">{block.content.caption}</p>}
          </div>
        )
      case 'speaker':
        return (
          <div className="px-6 py-6 flex items-center gap-4 bg-gray-50 mx-6 rounded-lg my-2 border border-gray-100">
            <img src={block.content.avatar} alt={block.content.name} className="size-16 rounded-full" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{block.content.name}</h3>
              <p className="text-gray-600">{block.content.title}</p>
            </div>
          </div>
        )
      case 'event':
        return (
          <div className="px-6 py-6 mx-6 bg-white border border-gray-200 shadow-sm rounded-lg my-2 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{block.content.name}</h3>
            <p className="text-gray-600 mb-1">{block.content.date}</p>
            <p className="text-gray-500 text-sm mb-4">{block.content.location}</p>
            <button className="bg-primary text-gray-900 font-bold py-2 px-6 rounded-md">{block.content.cta}</button>
          </div>
        )
      case 'button':
        return (
          <div className="px-6 py-4 text-center">
            <a href={block.content.url} style={{ backgroundColor: block.content.color }} className="inline-block py-3 px-8 text-white font-bold rounded-md no-underline">
              {block.content.text}
            </a>
          </div>
        )
      case 'divider':
        return <hr style={{ borderTopStyle: block.content.style, borderColor: block.content.color }} className="my-6 mx-6" />
      case 'social':
        return (
          <div className="px-6 py-6 text-center flex justify-center gap-4">
            <a href="#" className="size-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">IN</a>
            <a href="#" className="size-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">TW</a>
            <a href="#" className="size-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">IG</a>
          </div>
        )
      default: return null
    }
  }

  const renderProperties = () => {
    if (!activeBlock) {
      return (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400 mt-10">
          <p>Select a block to edit its properties.</p>
        </div>
      )
    }

    const block = blocks.find(b => b.id === activeBlock)
    if (!block) return null

    return (
      <div className="p-4 space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          {BLOCK_TYPES.find(t => t.id === block.type)?.icon} 
          {BLOCK_TYPES.find(t => t.id === block.type)?.label} Settings
        </h3>
        
        {block.type === 'header' && (
          <>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Title</label>
              <input type="text" value={block.content.title} onChange={e => updateBlockContent(block.id, { title: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Subtitle</label>
              <input type="text" value={block.content.subtitle} onChange={e => updateBlockContent(block.id, { subtitle: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Background Color</label>
              <input type="color" value={block.content.bg} onChange={e => updateBlockContent(block.id, { bg: e.target.value })} className="w-full rounded border h-10" />
            </div>
          </>
        )}

        {block.type === 'text' && (
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Text Content</label>
            <textarea rows="4" value={block.content.text} onChange={e => updateBlockContent(block.id, { text: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"></textarea>
          </div>
        )}

        {block.type === 'button' && (
          <>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Button Text</label>
              <input type="text" value={block.content.text} onChange={e => updateBlockContent(block.id, { text: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">URL</label>
              <input type="text" value={block.content.url} onChange={e => updateBlockContent(block.id, { url: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Color</label>
              <input type="color" value={block.content.color} onChange={e => updateBlockContent(block.id, { color: e.target.value })} className="w-full rounded border h-10" />
            </div>
          </>
        )}

        {block.type === 'speaker' && (
          <>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Name</label>
              <input type="text" value={block.content.name} onChange={e => updateBlockContent(block.id, { name: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Title/Topic</label>
              <input type="text" value={block.content.title} onChange={e => updateBlockContent(block.id, { title: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Avatar URL</label>
              <input type="text" value={block.content.avatar} onChange={e => updateBlockContent(block.id, { avatar: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </>
        )}

        {block.type === 'event' && (
          <>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Event Name</label>
              <input type="text" value={block.content.name} onChange={e => updateBlockContent(block.id, { name: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date</label>
              <input type="text" value={block.content.date} onChange={e => updateBlockContent(block.id, { date: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Location</label>
              <input type="text" value={block.content.location} onChange={e => updateBlockContent(block.id, { location: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">CTA Text</label>
              <input type="text" value={block.content.cta} onChange={e => updateBlockContent(block.id, { cta: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </>
        )}
        
        {block.type === 'image' && (
          <>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Image URL</label>
              <input type="text" value={block.content.url} onChange={e => updateBlockContent(block.id, { url: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Caption</label>
              <input type="text" value={block.content.caption} onChange={e => updateBlockContent(block.id, { caption: e.target.value })} className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <PageLayout>
      <div className="flex h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 overflow-hidden text-gray-900 dark:text-gray-100">
        
        {/* Left Sidebar - Palette */}
        <div className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto z-10">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg">Newsletter Studio</h2>
            <p className="text-xs text-gray-500 mt-1">{subscribersCount} active subscribers</p>
          </div>
          
          <div className="p-4">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">Blocks</h3>
            <div className="grid grid-cols-2 gap-2">
              {BLOCK_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleAddBlock(type.id)}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-colors bg-gray-50 dark:bg-gray-900/50"
                >
                  <span className="text-xl text-gray-600 dark:text-gray-400">{type.icon}</span>
                  <span className="text-xs font-medium text-center">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">Templates</h3>
            <div className="space-y-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleLoadTemplate(t)}
                  className="w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-gray-50 dark:bg-gray-900/50">
          <div className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4 z-10">
            <input 
              type="text" 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-1/2"
              placeholder="Email Subject"
            />
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-1.5 rounded-md ${previewMode === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
                >
                  <FaDesktop size={14} />
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-1.5 rounded-md ${previewMode === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
                >
                  <FaMobileAlt size={14} />
                </button>
              </div>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
              <button onClick={handleLoadDraft} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md">
                <FaFolderOpen /> Load
              </button>
              <button onClick={handleSaveDraft} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-primary text-gray-900 rounded-md hover:brightness-105">
                <FaSave /> Save
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div 
              className={`mx-auto bg-white shadow-xl min-h-[600px] transition-all duration-300 relative ${
                previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
              }`}
            >
              {blocks.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <FaEnvelope className="size-16 mb-4 opacity-20" />
                  <p>Drag or click blocks from the left to start building</p>
                </div>
              ) : (
                <div className="pb-20">
                  {blocks.map((block, index) => (
                    <div 
                      key={block.id} 
                      className={`relative group cursor-pointer ${activeBlock === block.id ? 'ring-2 ring-primary ring-inset' : 'hover:ring-1 hover:ring-gray-300 hover:ring-inset'}`}
                      onClick={() => setActiveBlock(block.id)}
                    >
                      {/* Block Controls (show on hover/active) */}
                      <div className={`absolute right-[-40px] top-2 flex-col gap-1 hidden group-hover:flex ${activeBlock === block.id ? '!flex' : ''}`}>
                        <button onClick={(e) => { e.stopPropagation(); handleMoveBlock(index, -1) }} className="p-1.5 bg-white dark:bg-gray-800 rounded shadow text-gray-600 hover:text-primary"><FaArrowUp size={12} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleMoveBlock(index, 1) }} className="p-1.5 bg-white dark:bg-gray-800 rounded shadow text-gray-600 hover:text-primary"><FaArrowDown size={12} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteBlock(block.id) }} className="p-1.5 bg-white dark:bg-gray-800 rounded shadow text-red-500 hover:bg-red-50"><FaTrash size={12} /></button>
                      </div>
                      
                      {renderBlockPreview(block)}
                      
                      {/* Active overlay border */}
                      {activeBlock === block.id && <div className="absolute inset-0 border-2 border-primary pointer-events-none z-10"></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto z-10">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg">Properties</h2>
          </div>
          {renderProperties()}
        </div>

      </div>
    </PageLayout>
  )
}

function FaEnvelope(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props}>
      <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
    </svg>
  )
}
