import api from "../api";

const scanService = {

  startScan: async (domain, mode) => {
    const res = await api.post("/scans/start", { domain, mode });
    return res.data;
  },

  stopScan: async (scanId) => {
    const res = await api.post(`/scans/stop/${scanId}`);
    return res.data;
  },

  restartScan: async (scanId) => {
    const res = await api.post(`/scans/restart/${scanId}`);
    return res.data;
  },

  // ✅ FIXED
  getScanStatus: async (scanId) => {
    const res = await api.get(`/scans/status/${scanId}`);
    return res.data;
  },

  // ✅ FIXED
  getScanResults: async (scanId) => {
    const res = await api.get(`/scans/results/${scanId}`);
    return res.data;
  },

  getAllScans: async () => {
    const res = await api.get("/scans");
    return res.data;
  },

  deleteScan: async (scanId) => {
    const res = await api.delete(`/scans/${scanId}`);
    return res.data;
  }
};

export default scanService;
