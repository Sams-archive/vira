// // import { useState } from 'react'
// // import DashboardLayout from '../components/DashboardLayout'
// // import { Link2, Upload, Loader2, CheckCircle2, Scissors, Youtube, Instagram } from 'lucide-react'
// // import { supabase } from '../lib/supabase';

// // const platforms = [
// //   { id: 'youtube', label: 'YouTube', icon: '▶', color: 'text-red-400' },
// //   { id: 'tiktok', label: 'TikTok', icon: '♪', color: 'text-white' },
// //   { id: 'instagram', label: 'Instagram', icon: '◈', color: 'text-pink-400' },
// //   { id: 'facebook', label: 'Facebook', icon: 'f', color: 'text-blue-400' },
// // ]

// // const steps = [
// //   { label: 'Downloading video', done: true },
// //   { label: 'Transcribing audio', done: true },
// //   { label: 'Analysing content', done: true },
// //   { label: 'Detecting highlights', done: false },
// //   { label: 'Generating clips', done: false },
// // ]

// // export default function ImportVideo() {
// //   const [url, setUrl] = useState('')
// //   const [loading, setLoading] = useState(false)
// //   const [phase, setPhase] = useState(0)
// //   const [done, setDone] = useState(false)
// //   const [dragging, setDragging] = useState(false)

// //   const handleImport = () => {
// //     if (!url.trim()) return
// //     setLoading(true)
// //     setDone(false)
// //     setPhase(0)

// //     const interval = setInterval(() => {
// //       setPhase(p => {
// //         if (p >= steps.length - 1) {
// //           clearInterval(interval)
// //           setTimeout(() => { setLoading(false); setDone(true) }, 500)
// //           return p
// //         }
// //         return p + 1
// //       })
// //     }, 700)
// //   }

  

// //   return (
// //     <DashboardLayout>
// //       <div className="p-8 max-w-3xl">
// //         <div className="mb-8">
// //           <p className="section-label">Import</p>
// //           <h1 className="font-display font-bold text-2xl mb-1">Import Video</h1>
// //           <p className="text-white/40 text-sm">Paste a link or upload a file to start repurposing.</p>
// //         </div>

// //         {/* Platform icons */}
// //         <div className="flex gap-3 mb-6">
// //           {platforms.map(({ id, label, icon, color }) => (
// //             <div key={id} className="flex items-center gap-2 bg-card border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm">
// //               <span className={`font-bold ${color}`}>{icon}</span>
// //               <span className="text-white/60">{label}</span>
// //             </div>
// //           ))}
// //         </div>

// //         {/* URL input */}
// //         <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mb-5">
// //           <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Video URL</label>
// //           <div className="flex gap-3">
// //             <div className="flex-1 relative">
// //               <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
// //               <input
// //                 className="input-field pl-9"
// //                 placeholder="https://youtube.com/watch?v=... or TikTok, Instagram link"
// //                 value={url}
// //                 onChange={e => setUrl(e.target.value)}
// //               />
// //             </div>
// //             <button
// //               onClick={handleImport}
// //               disabled={loading || !url.trim()}
// //               className="btn-primary flex items-center gap-2 px-5 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
// //             >
// //               {loading ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
// //               Import
// //             </button>
// //           </div>
// //         </div>

// //         {/* Divider */}
// //         <div className="flex items-center gap-3 my-5">
// //           <div className="flex-1 h-px bg-white/[0.06]" />
// //           <span className="text-xs text-white/25">or</span>
// //           <div className="flex-1 h-px bg-white/[0.06]" />
// //         </div>

// //         {/* File upload drop zone */}
// //         <div
// //           onDragOver={e => { e.preventDefault(); setDragging(true) }}
// //           onDragLeave={() => setDragging(false)}
// //           onDrop={e => { e.preventDefault(); setDragging(false) }}
// //           className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
// //             dragging ? 'border-accent/60 bg-accent/5' : 'border-white/[0.08] hover:border-white/20'
// //           }`}
// //         >
// //           <Upload size={28} className="text-white/20 mx-auto mb-3" />
// //           <p className="text-sm font-medium text-white/60 mb-1">Drop your video file here</p>
// //           <p className="text-xs text-white/30 mb-4">MP4, MOV, AVI up to 2GB</p>
// //           <button className="btn-secondary text-sm py-2 px-5">Browse files</button>
// //         </div>

// //         {/* Progress */}
// //         {loading && (
// //           <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mt-5">
// //             <p className="text-sm font-medium mb-4">Processing video…</p>
// //             <div className="space-y-3">
// //               {steps.map(({ label }, i) => {
// //                 const isActive = i === phase
// //                 const isDone = i < phase
// //                 return (
// //                   <div key={label} className="flex items-center gap-3">
// //                     <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
// //                       isDone ? 'bg-accent2/20 border border-accent2/40' :
// //                       isActive ? 'bg-accent/20 border border-accent/40' :
// //                       'bg-white/5 border border-white/[0.07]'
// //                     }`}>
// //                       {isDone
// //                         ? <CheckCircle2 size={12} className="text-accent2" />
// //                         : isActive
// //                         ? <Loader2 size={12} className="text-accent animate-spin" />
// //                         : <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
// //                       }
// //                     </div>
// //                     <span className={`text-sm transition-colors ${
// //                       isDone ? 'text-white/50 line-through' :
// //                       isActive ? 'text-white' : 'text-white/30'
// //                     }`}>{label}</span>
// //                   </div>
// //                 )
// //               })}
// //             </div>
// //             <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
// //               <div
// //                 className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all duration-500"
// //                 style={{ width: `${((phase + 1) / steps.length) * 100}%` }}
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {/* Done state */}
// //         {done && (
// //           <div className="bg-accent2/5 border border-accent2/20 rounded-2xl p-5 mt-5">
// //             <div className="flex items-center gap-3 mb-4">
// //               <CheckCircle2 size={18} className="text-accent2" />
// //               <p className="font-medium text-accent2">Video processed successfully!</p>
// //             </div>
// //             <p className="text-sm text-white/50 mb-4">VIRA detected <strong className="text-white">8 highlight moments</strong> and generated <strong className="text-white">12 clips</strong> ready for export.</p>
// //             <div className="flex gap-3">
// //               <a href="/clips" className="btn-primary flex items-center gap-2 no-underline text-sm py-2.5">
// //                 <Scissors size={14} /> View AI Clips
// //               </a>
// //               <button className="btn-secondary text-sm py-2.5" onClick={() => { setDone(false); setUrl('') }}>
// //                 Import another
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </DashboardLayout>
// //   )
// // }


// import { useState } from 'react'
// import DashboardLayout from '../components/DashboardLayout'
// import { Link2, Upload, Loader2, CheckCircle2, Scissors } from 'lucide-react'
// import { supabase } from '../lib/supabase';

// const platforms = [
//   { id: 'youtube', label: 'YouTube', icon: '▶', color: 'text-red-400' },
//   { id: 'tiktok', label: 'TikTok', icon: '♪', color: 'text-white' },
//   { id: 'instagram', label: 'Instagram', icon: '◈', color: 'text-pink-400' },
//   { id: 'facebook', label: 'Facebook', icon: 'f', color: 'text-blue-400' },
// ]

// const steps = [
//   { label: 'Downloading video' },
//   { label: 'Transcribing audio' },
//   { label: 'Analysing content' },
//   { label: 'Detecting highlights' },
//   { label: 'Generating clips' },
// ]

// export default function ImportVideo() {
//   const [url, setUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [phase, setPhase] = useState(0)
//   const [done, setDone] = useState(false)
//   const [dragging, setDragging] = useState(false)
//   const [error, setError] = useState(null)

//   // 1. Logic for URL Import (YouTube/TikTok)
//   const handleUrlImport = async () => {
//     if (!url.trim()) return;
//     setLoading(true);
//     setError(null);
//     setPhase(0);

//     try {
//       const { data: { user } } = await supabase.auth.getUser();

//       // Trigger the real backend process
//       const response = await fetch('http://localhost:5000/api/import-url', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, userId: user.id }),
//       });

//       if (!response.ok) throw new Error("Backend import failed");

//       // Simulating progress steps while backend works
//       const interval = setInterval(() => {
//         setPhase(p => {
//           if (p >= steps.length - 1) {
//             clearInterval(interval);
//             setLoading(false);
//             setDone(true);
//             return p;
//           }
//           return p + 1;
//         });
//       }, 2000); // Slower interval to match real processing

//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // 2. Logic for Local File Upload
//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setLoading(true);
//     setPhase(0);

//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       const fileName = `${user.id}/uploads/${Date.now()}-${file.name}`;

//       // Upload directly to Supabase Storage
//       const { data, error: uploadError } = await supabase.storage
//         .from('vira-media')
//         .upload(fileName, file);

//       if (uploadError) throw uploadError;

//       // Notify your backend to start processing the uploaded file
//       await fetch('http://localhost:5000/api/process-upload', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ storagePath: data.path, userId: user.id }),
//       });

//       setPhase(4); // Jump ahead since download isn't needed
//       setLoading(false);
//       setDone(true);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-8 max-w-3xl">
//         <div className="mb-8">
//           <p className="section-label text-accent font-bold uppercase tracking-tighter text-xs mb-2">Import</p>
//           <h1 className="font-display font-bold text-2xl mb-1">Import Video</h1>
//           <p className="text-white/40 text-sm">Paste a link or upload a file to start repurposing.</p>
//         </div>

//         {error && (
//           <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-5 text-sm">
//             {error}
//           </div>
//         )}

//         <div className="flex gap-3 mb-6">
//           {platforms.map(({ id, label, icon, color }) => (
//             <div key={id} className="flex items-center gap-2 bg-card border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm">
//               <span className={`font-bold ${color}`}>{icon}</span>
//               <span className="text-white/60">{label}</span>
//             </div>
//           ))}
//         </div>

//         <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mb-5">
//           <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Video URL</label>
//           <div className="flex gap-3">
//             <div className="flex-1 relative">
//               <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
//               <input
//                 className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 text-sm text-white focus:outline-none focus:border-accent/50"
//                 placeholder="YouTube, TikTok, or Instagram link"
//                 value={url}
//                 onChange={e => setUrl(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={handleUrlImport}
//               disabled={loading || !url.trim()}
//               className="bg-accent hover:opacity-90 text-black font-bold py-2 px-6 rounded-xl flex items-center gap-2 transition-all disabled:opacity-40"
//             >
//               {loading ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
//               Import
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 my-5">
//           <div className="flex-1 h-px bg-white/[0.06]" />
//           <span className="text-xs text-white/25">or</span>
//           <div className="flex-1 h-px bg-white/[0.06]" />
//         </div>

//         <div
//           onDragOver={e => { e.preventDefault(); setDragging(true) }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={e => { e.preventDefault(); setDragging(false); handleFileUpload(e.dataTransfer.files[0]) }}
//           onClick={() => document.getElementById('file-input').click()}
//           className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
//             dragging ? 'border-accent/60 bg-accent/5' : 'border-white/[0.08] hover:border-white/20'
//           }`}
//         >
//           <input 
//             type="file" 
//             id="file-input" 
//             hidden 
//             accept="video/*" 
//             onChange={(e) => handleFileUpload(e.target.files[0])} 
//           />
//           <Upload size={28} className="text-white/20 mx-auto mb-3" />
//           <p className="text-sm font-medium text-white/60 mb-1">Drop your video file here</p>
//           <p className="text-xs text-white/30 mb-4">MP4, MOV up to 2GB</p>
//           <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm py-2 px-5 rounded-lg transition-all">
//             Browse files
//           </button>
//         </div>

//         {loading && (
//           <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mt-5">
//             <p className="text-sm font-medium mb-4">Processing video…</p>
//             <div className="space-y-3">
//               {steps.map(({ label }, i) => (
//                 <div key={label} className="flex items-center gap-3">
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
//                     i < phase ? 'bg-green-500/20 border border-green-500/40' :
//                     i === phase ? 'bg-accent/20 border border-accent/40' : 'bg-white/5'
//                   }`}>
//                     {i < phase ? <CheckCircle2 size={12} className="text-green-500" /> :
//                      i === phase ? <Loader2 size={12} className="text-accent animate-spin" /> : 
//                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
//                   </div>
//                   <span className={`text-sm ${i < phase ? 'text-white/50' : i === phase ? 'text-white' : 'text-white/30'}`}>
//                     {label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {done && (
//           <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5 mt-5 animate-in fade-in slide-in-from-bottom-2">
//             <div className="flex items-center gap-3 mb-4">
//               <CheckCircle2 size={18} className="text-green-500" />
//               <p className="font-medium text-green-500">Video processed successfully!</p>
//             </div>
//             <div className="flex gap-3">
//               <button 
//                 onClick={() => window.location.href = '/clips'}
//                 className="bg-accent text-black font-bold py-2 px-5 rounded-xl flex items-center gap-2 text-sm"
//               >
//                 <Scissors size={14} /> View AI Clips
//               </button>
//               <button className="bg-white/5 text-white py-2 px-5 rounded-xl text-sm" onClick={() => { setDone(false); setUrl('') }}>
//                 Import another
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   )
// }

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { supabase } from '../lib/supabase'
import {
  Link2, Upload, Loader2, CheckCircle2,
  Scissors, AlertCircle, File, X
} from 'lucide-react'

const platforms = [
  { id: 'youtube',   label: 'YouTube',   icon: '▶', color: 'text-red-400'  },
  { id: 'tiktok',    label: 'TikTok',    icon: '♪', color: 'text-white'    },
  { id: 'instagram', label: 'Instagram', icon: '◈', color: 'text-pink-400' },
  { id: 'facebook',  label: 'Facebook',  icon: 'f', color: 'text-blue-400' },
]

const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mkv']
const MAX_SIZE_GB = 2
const MAX_SIZE_BYTES = MAX_SIZE_GB * 1024 * 1024 * 1024

export default function ImportVideo() {
  const navigate  = useNavigate()
  const fileInput = useRef(null)

  const [url, setUrl]           = useState('')
  const [dragging, setDragging] = useState(false)
  const [file, setFile]         = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress]   = useState(0)
  const [error, setError]         = useState('')
  const [done, setDone]           = useState(false)
  const [projectId, setProjectId] = useState(null)

  // ── File validation ────────────────────────────────────────────────────────
  const validateFile = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Unsupported file type. Please upload MP4, MOV, AVI, WebM or MKV.')
      return false
    }
    if (f.size > MAX_SIZE_BYTES) {
      setError(`File too large. Maximum size is ${MAX_SIZE_GB}GB.`)
      return false
    }
    return true
  }

  const handleFileSelect = (f) => {
    setError('')
    setDone(false)
    if (validateFile(f)) setFile(f)
  }

  // ── Drag and drop ──────────────────────────────────────────────────────────
  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true)  }
  const handleDragLeave = ()  => setDragging(false)
  const handleDrop      = (e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFileSelect(dropped)
  }

  // ── Format file size ───────────────────────────────────────────────────────
  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  // ── Upload file to Supabase Storage ───────────────────────────────────────
  const handleUpload = async () => {
    if (!file) return
    setError('')
    setUploading(true)
    setProgress(0)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Create unique file path
      const fileExt  = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // Upload to Supabase Storage
      // Simulate progress since Supabase doesn't give upload progress natively
      const progressInterval = setInterval(() => {
        setProgress(p => Math.min(p + 5, 85))
      }, 200)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        })

      clearInterval(progressInterval)

      if (uploadError) throw uploadError

      setProgress(90)

      // Save project record to database
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id:      user.id,
          title:        file.name.replace(/\.[^/.]+$/, ''), // remove extension
          status:       'pending',
          source:       'upload',
          s3_key:       uploadData.path,
        })
        .select()
        .single()

      if (projectError) throw projectError

      setProgress(100)
      setProjectId(project.id)
      setDone(true)

    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // ── URL import (saves URL, backend will process) ───────────────────────────
  const handleUrlImport = async () => {
    if (!url.trim()) return
    setError('')
    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Detect platform from URL
      const detectPlatform = (url) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
        if (url.includes('tiktok.com'))   return 'tiktok'
        if (url.includes('instagram.com')) return 'instagram'
        if (url.includes('facebook.com')) return 'facebook'
        return 'upload'
      }

      // Save project with URL — backend will download and process it
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id:           user.id,
          title:             `Import — ${new Date().toLocaleDateString()}`,
          status:            'pending',
          source:            detectPlatform(url),
          original_video_url: url,
        })
        .select()
        .single()

      if (projectError) throw projectError

      setProjectId(project.id)
      setDone(true)

    } catch (err) {
      console.error('URL import error:', err)
      setError(err.message || 'Import failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="section-label">Import</p>
          <h1 className="font-display font-bold text-2xl mb-1">Import Video</h1>
          <p className="text-white/40 text-sm">Upload a file or paste a link to start repurposing.</p>
        </div>

        {/* Platform icons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {platforms.map(({ id, label, icon, color }) => (
            <div key={id} className="flex items-center gap-2 bg-card border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm">
              <span className={`font-bold ${color}`}>{icon}</span>
              <span className="text-white/60">{label}</span>
            </div>
          ))}
        </div>

        {/* URL input */}
        <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mb-5">
          <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
            Video URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                className="input-field pl-9"
                placeholder="https://youtube.com/watch?v=... or TikTok, Instagram link"
                value={url}
                onChange={e => { setUrl(e.target.value); setError(''); setDone(false) }}
              />
            </div>
            <button
              onClick={handleUrlImport}
              disabled={uploading || !url.trim()}
              className="btn-primary flex items-center gap-2 px-5 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {uploading && !file
                ? <Loader2 size={14} className="animate-spin" />
                : <Link2 size={14} />
              }
              Import
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-white/25">or upload a file</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* File selected preview */}
        {file && !done && (
          <div className="bg-card border border-white/[0.07] rounded-2xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <File size={16} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-white/35">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={() => { setFile(null); setProgress(0) }}
              className="text-white/30 hover:text-white/70 transition-colors bg-transparent border-0 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Drop zone */}
        {!file && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInput.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
              dragging
                ? 'border-accent/60 bg-accent/5'
                : 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]'
            }`}
          >
            <Upload size={28} className="text-white/20 mx-auto mb-3" />
            <p className="text-sm font-medium text-white/60 mb-1">
              Drop your video file here
            </p>
            <p className="text-xs text-white/30 mb-4">
              MP4, MOV, AVI, WebM — up to 2GB
            </p>
            <button className="btn-secondary text-sm py-2 px-5 pointer-events-none">
              Browse files
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0]
                if (f) handleFileSelect(f)
              }}
            />
          </div>
        )}

        {/* Upload button */}
        {file && !done && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 mt-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading
              ? <><Loader2 size={15} className="animate-spin" /> Uploading {progress}%…</>
              : <><Upload size={15} /> Upload Video</>
            }
          </button>
        )}

        {/* Upload progress */}
        {uploading && file && (
          <div className="mt-4">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-white/35 mt-1.5 text-center">
              {progress < 90 ? 'Uploading video…' : 'Saving project…'}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-accent3/10 border border-accent3/20 rounded-xl px-4 py-3 mt-4 flex items-center gap-3">
            <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Success state */}
        {done && (
          <div className="bg-accent2/5 border border-accent2/20 rounded-2xl p-5 mt-5">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 size={18} className="text-accent2" />
              <p className="font-medium text-accent2">
                {file ? 'Video uploaded successfully!' : 'Video URL saved successfully!'}
              </p>
            </div>
            <p className="text-sm text-white/50 mb-4">
              Your project has been created. The AI will process your video and generate clips automatically.
              This may take a few minutes depending on the video length.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate('/clips')}
                className="btn-primary flex items-center gap-2 text-sm py-2.5"
              >
                <Scissors size={14} /> View AI Clips
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary text-sm py-2.5"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setFile(null)
                  setUrl('')
                  setDone(false)
                  setProgress(0)
                  setProjectId(null)
                }}
                className="btn-secondary text-sm py-2.5"
              >
                Import another
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}