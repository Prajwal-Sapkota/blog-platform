import React, { useEffect, useState } from "react";
import api from "../../../utils/api";

export default function ActivityLog(){
  const [logs, setLogs] = useState([]);
  useEffect(()=>{ (async()=>{ const res = await api.get("/admin/activity"); setLogs(res.data); })(); }, []);
  return (
    <div>
      <h1 className="text-2xl mb-4">Activity Log</h1>
      <ul className="space-y-2">
        {logs.map(l=>(
          <li key={l.id} className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-600">{l.actor} • {new Date(l.createdAt).toLocaleString()}</div>
            <div>{l.action}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
