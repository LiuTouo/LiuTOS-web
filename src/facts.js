export const FACTS = {
  zh: {
    SYS: [
      ['映像', 'Windows 11 24H2 / 25H2'],
      ['預裝項目', '0'],
      ['自動驅動安裝', '停用'],
      ['授權', '已開通']
    ],
    PB: [
      ['registry', '6,736 筆'],
      ['AppX', '依選項回裝'],
      ['Defender', '常駐移除'],
      ['套用模式', 'overhaul 不重裝'],
      ['還原', '可回滾']
    ],
    OPT: [
      ['MMCSS', '20 → 1'],
      ['Games', 'GPU 8 · Priority 6'],
      ['Low Latency', 'Priority 8 · SFIO High'],
      ['網路節流', '0xFFFFFFFF'],
      ['關機等待', '2000 ms'],
      ['revert', '兩支內建']
    ],
    WU: [
      ['任務', '9 項'],
      ['Edge 原則', '16 項'],
      ['IPv6', 'DisabledComponents = 255'],
      ['元件清理', 'DISM /ResetBase'],
      ['回報', '逐步成功或失敗']
    ],
    GPU: [
      ['安裝元件', 'Display Driver'],
      ['GeForce Experience', '不裝'],
      ['Telemetry', '不裝'],
      ['覆疊層', '不裝']
    ],
    NV: [
      ['套用範圍', '_GLOBAL_DRIVER_PROFILE'],
      ['電源管理', '最高效能'],
      ['低延遲模式', '開啟'],
      ['設定檔', 'LiuT.nip']
    ],
    PWR: [
      ['平台', 'AMD / Intel'],
      ['檔案', 'LiuT_AMD / LiuT_Intel'],
      ['匯入', 'powercfg -import'],
      ['切回原廠', '可']
    ],
    TXT: [
      ['字型優先序', 'noMeiryoUI'],
      ['渲染', 'MacType'],
      ['範圍', '全系統'],
      ['生效', '登出後']
    ],
    MSE: [
      ['MouseSpeed', '0'],
      ['Threshold1 / 2', '0'],
      ['MouseAccel', '0'],
      ['權限', '免管理員'],
      ['生效', '登出後']
    ],
    LAST: [
      ['TaskbarAl', '1'],
      ['Hidden', '2'],
      ['VisiblePlaces', '+ Settings'],
      ['explorer', '自動重啟']
    ]
  },
  en: {
    SYS: [
      ['Image', 'Windows 11 24H2 / 25H2'],
      ['Preloaded extras', '0'],
      ['Auto driver install', 'disabled'],
      ['License', 'activated']
    ],
    PB: [
      ['registry', '6,736 entries'],
      ['AppX', 'reinstall by choice'],
      ['Defender', 'resident removed'],
      ['Mode', 'overhaul, no reinstall'],
      ['Rollback', 'available']
    ],
    OPT: [
      ['MMCSS', '20 → 1'],
      ['Games', 'GPU 8 · Priority 6'],
      ['Low Latency', 'Priority 8 · SFIO High'],
      ['Throttling', '0xFFFFFFFF'],
      ['Shutdown wait', '2000 ms'],
      ['revert', 'in both scripts']
    ],
    WU: [
      ['Tasks', '9'],
      ['Edge policies', '16'],
      ['IPv6', 'DisabledComponents = 255'],
      ['Component cleanup', 'DISM /ResetBase'],
      ['Reporting', 'per step']
    ],
    GPU: [
      ['Component', 'Display Driver'],
      ['GeForce Experience', 'not installed'],
      ['Telemetry', 'not installed'],
      ['Overlay', 'not installed']
    ],
    NV: [
      ['Scope', '_GLOBAL_DRIVER_PROFILE'],
      ['Power management', 'max performance'],
      ['Low latency', 'on'],
      ['Profile', 'LiuT.nip']
    ],
    PWR: [
      ['Platform', 'AMD / Intel'],
      ['File', 'LiuT_AMD / LiuT_Intel'],
      ['Import', 'powercfg -import'],
      ['Back to stock', 'yes']
    ],
    TXT: [
      ['Font order', 'noMeiryoUI'],
      ['Rendering', 'MacType'],
      ['Scope', 'system-wide'],
      ['Apply', 'after sign-out']
    ],
    MSE: [
      ['MouseSpeed', '0'],
      ['Threshold1 / 2', '0'],
      ['MouseAccel', '0'],
      ['Elevation', 'not needed'],
      ['Apply', 'after sign-out']
    ],
    LAST: [
      ['TaskbarAl', '1'],
      ['Hidden', '2'],
      ['VisiblePlaces', '+ Settings'],
      ['explorer', 'restarted']
    ]
  }
}
