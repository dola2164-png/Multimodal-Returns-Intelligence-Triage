import { useMemo, useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // I have pre-loaded YOUR exact JSON here so you can see how it looks instantly!
  // When you are ready to test the real backend, just change this back to: useState(null);
  const [result, setResult] = useState({
    "condition_detected": "Excellent condition/New",
    "suggested_action": "Exchange",
    "confidence_score": 0.95,
    "internal_reasoning": "The product is a baby stroller, which is not a restricted hygiene item. The image shows the product in clean, seemingly unused condition. The customer has requested an exchange for a different color, which is a standard return/exchange scenario.",
    "customer_message_en": "Thank you for reaching out to Mumzworld! We would be happy to help you exchange your stroller for a different color. Please ensure the item is in its original packaging, and our team will contact you shortly to arrange the collection and delivery of your new choice.",
    "customer_message_ar": "شكراً لتواصلكم مع ممزورلد! يسعدنا مساعدتكم في استبدال عربة الأطفال بلون آخر. يرجى التأكد من بقاء المنتج في تغليفه الأصلي، وسيتواصل معكم فريقنا قريباً لترتيب استلام المنتج وتسليمكم اللون الجديد الذي اخترتموه."
  });

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) return setError("Please upload an image. | يرجى رفع صورة.");
    if (!reason.trim()) return setError("Please enter a return reason. | يرجى إدخال سبب الإرجاع.");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("customerReason", reason.trim());

      const res = await fetch("http://localhost:3000/api/triage", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Request failed | فشل الطلب");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Network error. Please try again. | خطأ في الشبكة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 font-sans">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Return Triage</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Mumzworld AI Portal</p>
          </div>
          <div className="text-right" dir="rtl">
            <h1 className="text-2xl font-bold text-slate-800">فرز الإرجاعات</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">بوابة الذكاء الاصطناعي</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 space-y-6"
        >
          {/* CUSTOM FILE UPLOAD */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-bold text-slate-700">1. Upload Image</label>
              <label className="block text-sm font-bold text-slate-700" dir="rtl">١. رفع الصورة</label>
            </div>
            
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full flex justify-between items-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 group-hover:bg-slate-100 transition-colors">
                <span className="text-sm font-medium text-slate-600">
                  {file ? file.name : "Tap to choose file..."}
                </span>
                <span className="text-sm font-medium text-slate-600" dir="rtl">
                  {file ? "تم اختيار الملف" : "اضغط لاختيار ملف..."}
                </span>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-3 relative rounded-md border border-slate-200 overflow-hidden w-full h-48 bg-slate-50 flex justify-center">
                <img src={previewUrl} alt="Preview" className="h-full w-auto object-contain" />
              </div>
            )}
          </div>

          {/* TEXT AREA */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-bold text-slate-700">2. Return/Exchange Reason</label>
              <label className="block text-sm font-bold text-slate-700" dir="rtl">٢. سبب الإرجاع</label>
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Example: The box arrived crushed... / مثال: وصل الصندوق مسحوقاً..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400"
            />
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-medium flex justify-between items-center">
              <span>{error.split('|')[0].trim()}</span>
              <span dir="rtl">{error.split('|')[1]?.trim() || ''}</span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 p-4 text-white hover:bg-slate-800 disabled:opacity-70 transition-all flex justify-between items-center shadow-md"
          >
            <span className="font-bold text-lg">{loading ? "Analyzing..." : "Submit Request"}</span>
            <span className="opacity-50">|</span>
            <span className="font-bold text-lg" dir="rtl">{loading ? "جاري التحليل..." : "إرسال الطلب"}</span>
          </button>
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800">Triage Result</h2>
              <h2 className="text-xl font-bold text-slate-800" dir="rtl">نتيجة الفرز</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* ACTION CARD */}
              <div className="rounded-xl border p-5 flex flex-col justify-between">
                <div className="flex justify-between w-full mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider ">Action</p>
                  <p className="text-xs font-bold tracking-wider " dir="rtl">الإجراء الموصى به</p>
                </div>
                <p className="text-2xl font-black text-slate-800 text-center uppercase tracking-wide">
                  {result.suggested_action || "N/A"}
                </p>
              </div>

              {/* CONFIDENCE CARD */}
              <div className="rounded-xl border  p-5 flex flex-col justify-between">
                <div className="flex justify-between w-full mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider ">AI Confidence</p>
                  <p className="text-xs font-bold tracking-wider " dir="rtl">نسبة الثقة</p>
                </div>
                <p className="text-2xl font-black text-slate-800 text-center">
                  {result.confidence_score ? `${(result.confidence_score * 100).toFixed(0)}%` : "N/A"}
                </p>
              </div>

              {/* REASONING CARD */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:col-span-2 shadow-inner">
                <div className="flex justify-between w-full mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Internal Reasoning</p>
                  <p className="text-xs font-bold tracking-wider text-slate-600" dir="rtl">المنطق الداخلي</p>
                </div>
                <p className="text-base text-slate-800 leading-relaxed font-medium">
                  {result.internal_reasoning || "No reasoning provided."}
                </p>
              </div>
            </div>

            {/* MESSAGE CARDS */}
            <div className="grid gap-4 md:grid-cols-2 mt-2">
              <div className="rounded-xl border bg-blue-50/70 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider  mb-3">
                  English Reply
                </p>
                <p className="text-sm text-slate-800 italic leading-relaxed">
                  "{result.customer_message_en || "N/A"}"
                </p>
              </div>

              <div className="rounded-xl border  bg-emerald-50/70 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 text-right">
                  الرد باللغة العربية
                </p>
                <p dir="rtl" className="text-lg text-slate-800 leading-relaxed font-medium">
                  "{result.customer_message_ar || "N/A"}"
                </p>
              </div>
            </div>

            {/* --- RAW JSON DATA SECTION --- */}
            <div className="rounded-xl bg-slate-900 p-5 overflow-auto mt-6 shadow-inner">
              <div className="flex justify-between w-full mb-3 border-b border-slate-700 pb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Raw Output Data</p>
                <p className="text-xs font-bold text-slate-400 tracking-widest" dir="rtl">البيانات الخام</p>
              </div>
              <pre className="text-sm text-white whitespace-pre-wrap font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            {/* ----------------------------- */}
            
          </div>
        )}
      </div>
    </div>
  );
}