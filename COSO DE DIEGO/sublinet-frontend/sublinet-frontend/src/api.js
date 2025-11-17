
const API_BASE = "http://localhost:5000/api"; // Ajustá según tu backend

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function fetchInventory() {
  const res = await fetch(`${API_BASE}/Products`);
  if (!res.ok) throw new Error(await safeJson(res));
  return res.json();
}

export async function fetchLatestBudget() {
  const res = await fetch(`${API_BASE}/Budgets/latest`);
  if (!res.ok) throw new Error(await safeJson(res));
  return res.json();
}

export async function fetchLatestPendingInvoice() {
  const res = await fetch(`${API_BASE}/Invoices/pending/latest`);
  if (!res.ok) throw new Error(await safeJson(res));
  return res.json();
}

export async function payInvoice(id) {
  const res = await fetch(`${API_BASE}/Invoices/${id}/pay`, {
    method: "POST"
  });
  if (!res.ok) throw new Error(await safeJson(res));
}

export async function createInvoice(invoicePayload) {
  const res = await fetch(`${API_BASE}/Invoices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoicePayload),
  });
  if (!res.ok) throw new Error(await safeJson(res));
  return res.json();
}
