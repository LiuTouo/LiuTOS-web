export const DISCORD_USER = 'liutelite'
export const DISCORD_URL = `https://discord.com/users/${DISCORD_USER}`

export const PRICES = {
  tune: 3500,
  full: 5000,
  addons: {
    backup: null,
    apps: null,
    curated: null,
    liut: null
  }
}

export const content = {
  zh: {
    langLabel: 'EN',
    brand: '流特',
    nav: [
      { id: 'pipeline', label: '流程' },
      { id: 'demos', label: '差異' },
      { id: 'hardware', label: '硬體' },
      { id: 'pricing', label: '價目' },
      { id: 'booking', label: '預約' }
    ],
    hero: {
      kicker: '系統重灌 · 深度優化 · 交機驗收',
      title: ['十道工序，', '一次交機。'],
      lead:
        '從乾淨的 Windows 到最後一項設定，都由我處理。你只要確認方案、告訴我哪些軟體要留，最後驗收。',
      scroll: '往下',
      stats: [
        { v: '10', k: '道工序' },
        { v: '3', k: '次確認' },
        { v: '2', k: '種方案' }
      ],
      log: [
        '預裝軟體 0 項',
        '背景常駐 已精簡',
        '遊戲排程 前景優先',
        '網路節流 關閉',
        '滑鼠加速 關閉',
        '電源計畫 依平台',
        '字型渲染 已接管',
        '顯卡 僅安裝驅動',
        '隱私選項 已關閉',
        '系統設定 可還原',
        '系統更新 只留安全',
        '驅動 不自動覆蓋',
        '暫存 已清理',
        '右鍵選單 已整理',
        '開始選單 已整理',
        '深色模式 已套用',
        '還原點 已建立',
        '電源 高效能',
        '工作列 已置中',
        '小工具 已移除',
        '開機項目 已精簡',
        '磁碟 已清理',
        '首頁與相簿 已移除',
        '通知 已整理'
      ]
    },
    baseline: {
      title: '一般重灌，跟交機後的差別',
      lead: '同一台機器。差別在你開機後看到什麼、玩遊戲時感覺到什麼。',
      colA: '一般重灌 / 原廠',
      colB: 'LiuTOS 交機',
      rows: [
        { name: '開機與待機', a: '廠商預裝與背景服務一堆，風扇一直轉', b: '只留必要的，其餘需要時才啟動，待機安靜' },
        { name: '遊戲時的資源', a: '背景程式跟遊戲平均分資源', b: '遊戲與前景優先，背景工作排到後面' },
        { name: '網路與輸入', a: '系統節流開著，滑鼠有加速曲線', b: '節流關閉，滑鼠位移 1:1' },
        { name: '你拿到手的', a: '一堆要自己關的設定與內建廣告', b: '照你的習慣設定好，直接開機就能用' }
      ],
      note: '以上是交機後的實際設定方向。體感差異依硬體、遊戲與驅動版本而異，本頁放的是可驗證的設定，不是編出來的幀數。'
    },
    pipeline: {
      title: '十道工序',
      lead: '往下滑看每一道在改什麼、你會感覺到什麼。左邊點編號可跳段。',
      stepLabel: '工序',
      panelLabel: '交機狀態',
      demoTag: '示意',
      footNote: '實際感受依硬體與遊戲而異',
      steps: [
        {
          code: 'SYS',
          feel: ['開機沒有預裝軟體在跑', '不用自己關廣告與推薦', '授權狀態交機前就確認好'],
          title: '系統與授權',
          lead: '用官方映像重寫一套乾淨的 Windows 11。開機後沒有廠商預裝、沒有試用版軟體，只做授權開通。',
          logs: ['› 預裝軟體 0 項', '› 系統來源 官方映像', '› 授權狀態 已開通', '› 自動安裝驅動 關閉'],
          stats: [
            { k: '預裝項目', v: '0' },
            { k: '系統來源', v: '官方映像' }
          ]
        },
        {
          code: 'PB',
          feel: ['待機時風扇不亂轉', '工作管理員看不到一堆背景程式', '要用的功能還在，只是不常駐'],
          title: '系統精簡',
          lead: '關掉用不到的功能、廣告與背景回報。系統只留你真正會用的部分，開機與待機都變安靜。',
          logs: ['› 遙測與回報 已關閉', '› 廣告與推薦 已移除', '› 背景常駐 大幅減少', '› 還原點 已建立'],
          stats: [
            { k: '遙測', v: '關閉' },
            { k: '還原', v: '可回滾' }
          ]
        },
        {
          code: 'PERF',
          feel: ['遊戲時背景程式自動讓路', '關機不用等計時器', '網路不再被系統節流'],
          title: '效能排程',
          lead: '系統預設把資源平均分給所有程式。這裡改成遊戲與前景優先，背景工作自動讓路。',
          logs: ['› 前景優先權 遊戲', '› 背景工作 延後', '› 網路節流 關閉', '› 關機等待 縮短'],
          stats: [
            { k: '遊戲排程', v: '前景優先' },
            { k: '還原', v: '可回原廠' }
          ]
        },
        {
          code: 'SET',
          feel: ['開機後不用再自己關一輪設定', '檔案總管與右鍵乾淨', '常用資料夾開啟更快'],
          title: '隱私與介面',
          lead: '暫存清理、隱私選項、檔案總管與介面設定一次處理完，不會留半套給你自己補。',
          list: [
            '暫存與垃圾檔案清理',
            '遙測與廣告回報關閉',
            '檔案總管顯示整理',
            '工作列與開始選單整理',
            '深色模式',
            '系統更新只留安全更新',
            '驅動不自動覆蓋',
            '右鍵與檔案總管加快',
            '不必要的背景元件移除'
          ],
          logs: ['› 暫存與垃圾 已清理', '› 隱私選項 已關閉', '› 介面設定 已整理', '› 更新 只留安全更新'],
          stats: [
            { k: '設定項目', v: '一次到位' },
            { k: '半套設定', v: '0' }
          ]
        },
        {
          code: 'GPU',
          feel: ['沒有 GeForce Experience 常駐', '驅動更新不會塞進附加程式', '開機少一個常駐項目'],
          title: '顯卡乾淨安裝',
          lead: '只裝顯示驅動本體。GeForce Experience、遙測、覆疊層、多餘的音訊與 USB-C 元件全部不裝。',
          logs: ['› 舊驅動 已移除', '› 安裝內容 僅顯示驅動', '› 附加程式 不安裝', '› 常駐程式 0'],
          stats: [
            { k: '安裝內容', v: '僅驅動' },
            { k: '常駐程式', v: '0' }
          ]
        },
        {
          code: 'NV',
          feel: ['每款遊戲不用重複設定', '更新驅動後設定還在', '所有遊戲同一套手感'],
          title: '顯卡全域設定',
          lead: '一次套用到所有遊戲的設定，不用為了每一款遊戲重新點一遍，更新後也不會被覆蓋掉。',
          logs: ['› 電源管理 最高效能', '› 低延遲 開啟', '› 垂直同步 統一', '› 套用範圍 所有遊戲'],
          stats: [
            { k: '套用範圍', v: '全域' },
            { k: '逐款設定', v: '不需要' }
          ]
        },
        {
          code: 'PWR',
          feel: ['升頻反應符合你的平台', '待機不亂省電降頻', '耗電與溫度取平衡'],
          title: '電源計畫',
          lead: '依你的 CPU 平台套用對應的電源計畫。AMD 與 Intel 的核心調度方式不同，同一份套在兩邊會互相拖累。',
          logs: {
            amd: ['› 平台 AMD', '› 計畫 客製高效能', '› 升頻與核心停放 依平台調整', '› 套用 開機生效'],
            intel: ['› 平台 Intel', '› 計畫 客製高效能', '› 升頻與核心停放 依平台調整', '› 套用 開機生效']
          },
          variant: {
            label: '你的平台',
            options: [
              { id: 'amd', label: 'AMD' },
              { id: 'intel', label: 'Intel' }
            ],
            note: '同一套流程，差別在挑哪一份計畫。'
          },
          stats: [
            { k: '計畫', v: '客製' },
            { k: '切回原廠', v: '可' }
          ]
        },
        {
          code: 'TXT',
          feel: ['字邊緣更清楚', '長時間看螢幕較不吃力', '中英混排更好讀'],
          title: '字型與渲染',
          lead: '重畫系統的文字渲染。同樣字級下，中文邊緣與英文間距都更清楚，長時間看螢幕比較不吃力。',
          logs: ['› 系統字型 已替換', '› 文字渲染 已接管', '› 套用範圍 全系統', '› 生效 重新登入後'],
          stats: [
            { k: '範圍', v: '全系統' },
            { k: '還原', v: '可' }
          ]
        },
        {
          code: 'MSE',
          feel: ['手移動多少畫面就多少', '定位更直覺', '習慣後更穩'],
          title: '滑鼠手感',
          lead: '關閉系統的滑鼠加速。手移動多少，畫面就移動多少，習慣之後定位更穩、更直覺。',
          logs: ['› 滑鼠加速 關閉', '› 位移曲線 1:1', '› 套用範圍 全系統', '› 生效 重新登入後'],
          stats: [
            { k: '加速', v: '關閉' },
            { k: '曲線', v: '1:1' }
          ]
        },
        {
          code: 'YOU',
          feel: ['介面就是你習慣的樣子', '要改隨時可以', '不用重新學'],
          title: '你的使用習慣',
          lead: '收尾調整成你習慣的樣子。工作列、檔案總管、開始選單先問過你，不硬塞我的偏好。',
          logs: ['› 工作列 依你的習慣', '› 檔案總管 依你的習慣', '› 開始選單 加入常用項目', '› 套用 立即生效'],
          stats: [
            { k: '調整項目', v: '依個人' },
            { k: '之後要改', v: '隨時' }
          ]
        }
      ]
    },
    handsOff: {
      title: '你只要做三件事',
      lead: '技術細節我處理，你不用碰任何設定，也不用學任何工具。',
      counter: '你的確認',
      total: '進度',
      hint: '三件事都完成，就可以開機驗收。',
      done: '都完成了。剩下交給我。',
      items: [
        { file: '確認方案', note: '重灌或單純優化，含要不要加購' },
        { file: '列出要保留的軟體與資料', note: '我照清單處理，不用你自己備份' },
        { file: '交機驗收', note: '當場跑你的遊戲或程式，確認手感' }
      ]
    },
    demos: {
      title: '兩個你拖得動的差別',
      lead: '不用信形容詞。這頁的兩個對照都能自己操作。',
      text: {
        title: '文字渲染',
        before: '原廠渲染',
        after: '調整後',
        sample: '這一行的中英混排 LiuTOS 2026 邊緣與字距，拖曳中間那條線比較。',
        caption: '示意：以瀏覽器渲染模擬兩者的邊緣差異，實際效果依字型、DPI 與螢幕而異。'
      },
      mouse: {
        title: '滑鼠加速',
        on: '加速開啟',
        off: '加速關閉',
        caption:
          '同一段手部移動。加速開啟時慢速段被縮小、快速段被放大，落點偏移；關閉後位移與畫面 1:1。'
      }
    },
    hardware: {
      title: '顯卡與電源，分開處理',
      lead: '這三塊不是勾選清單，是依你的顯卡與 CPU 走不同設定。',
      items: [
        {
          n: '01',
          title: '顯卡乾淨安裝',
          body: '只裝顯示驅動本體，其餘一律不裝。',
          list: ['不裝 GeForce Experience', '不裝遙測', '不裝覆疊層', '不裝多餘音訊與 USB-C 元件']
        },
        {
          n: '02',
          title: '顯卡全域設定',
          body: '一次套用到所有遊戲，不用逐款點。',
          list: ['電源管理：最高效能', '低延遲模式', '垂直同步', '預先渲染影格']
        },
        {
          n: '03',
          title: '電源計畫',
          body: '依 CPU 平台選計畫，不是一份套全部。',
          list: ['AMD：依 CCD 行為調整', 'Intel：依 P/E 核心調整', '核心停放與延遲容忍', '一鍵匯入，可切回原廠']
        }
      ]
    },
    addons: {
      title: '加購',
      lead: '四項可選。勾了會進到下面的票卡與預約訊息。',
      priceNote: '單價另計',
      items: [
        { id: 'backup', title: '重灌前備份', body: '文件、瀏覽器設定、遊戲存檔，重灌後幫你放回去。' },
        { id: 'apps', title: '指定軟體安裝', body: '你開清單，一次裝完並確認能開。' },
        { id: 'curated', title: '推薦軟體', body: '逐一介紹用途與差異，你選了才裝。' },
        { id: 'liut', title: '流特自製軟體', body: '自己的工具，裝完直接說明怎麼用。' }
      ]
    },
    pricing: {
      title: '價目',
      lead: '兩種。差別只在你原本的系統要不要重來。',
      currency: 'NTD',
      select: '選這個',
      tiers: [
        {
          id: 'tune',
          name: '不重灌優化',
          steps: '02 — 10',
          desc: '跳過第 1 步。系統、資料、已裝程式全部保留，其餘九道照做。',
          includes: [
            '系統精簡',
            '效能排程',
            '隱私與介面設定',
            '顯卡乾淨安裝與全域設定',
            '客製電源計畫',
            '字型、滑鼠、使用習慣'
          ]
        },
        {
          id: 'full',
          name: '全套重灌',
          steps: '01 — 10',
          desc: '從乾淨的 Windows 安裝與授權開始，十道工序跑完整套。',
          includes: [
            '含不重灌優化的全部內容',
            'Windows 11 安裝與授權',
            '開機基線與驅動',
            '十道工序完整執行',
            '交機驗收'
          ],
          featured: true
        }
      ],
      note: '加購項目與車馬／遠端方式另計。'
    },
    ticket: {
      label: '你的流程',
      empty: '尚未選擇',
      addonsLabel: '加購',
      total: '合計',
      cta: '預約'
    },
    booking: {
      title: '填完，複製，丟進 Discord',
      lead: '沒有後端、沒有月費表單。這頁只把你要的內容整理成一段訊息。',
      fields: {
        name: '稱呼',
        discord: '你的 Discord',
        cpu: 'CPU',
        gpu: 'GPU',
        goal: '想跑的遊戲或程式',
        note: '其他需求'
      },
      placeholders: {
        name: '怎麼稱呼你',
        discord: '例如 liut_9527',
        cpu: '例如 7800X3D',
        gpu: '例如 RTX 4070 Ti',
        goal: '例如 CS2、Valorant、剪片',
        note: '例如想保留哪些軟體'
      },
      copy: '複製訊息',
      copied: '已複製，貼進 Discord 就好',
      open: '開啟 Discord',
      copyFail: '複製失敗，請手動選取下方訊息',
      preview: '訊息預覽'
    },
    footer: {
      line: '十道工序，一次交機。',
      disclaimer:
        '本頁描述交機後的設定方向與實測值。效能與體感差異依硬體、遊戲與驅動版本而異，不做保證。',
      contact: 'Discord',
      replay: '重播開場'
    },
    labels: {
      expand: '展開內容',
      collapse: '收合內容',
      todo: '未完成',
      done: '完成'
    }
  },

  en: {
    langLabel: '中文',
    brand: 'LiuT',
    nav: [
      { id: 'pipeline', label: 'Stages' },
      { id: 'demos', label: 'Proof' },
      { id: 'hardware', label: 'Hardware' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'booking', label: 'Book' }
    ],
    hero: {
      kicker: 'CLEAN INSTALL · DEEP TUNING · HANDOVER',
      title: ['Ten stages.', 'One handover.'],
      lead:
        'From a clean Windows install to the last setting, I handle all of it. You confirm the plan, tell me what to keep, and check the result.',
      scroll: 'Scroll',
      stats: [
        { v: '10', k: 'stages' },
        { v: '3', k: 'confirmations' },
        { v: '2', k: 'plans' }
      ],
      log: [
        'preloaded apps 0',
        'background load trimmed',
        'game scheduling foreground',
        'network throttling off',
        'mouse acceleration off',
        'power plan per platform',
        'text rendering replaced',
        'GPU driver only',
        'privacy options off',
        'settings reversible',
        'updates security only',
        'drivers not auto-replaced',
        'temp files cleared',
        'context menu cleaned',
        'start menu organised',
        'dark mode applied',
        'restore point created',
        'power high performance',
        'taskbar centered',
        'widgets removed',
        'startup items trimmed',
        'disk cleaned',
        'home and gallery removed',
        'notifications arranged'
      ]
    },
    baseline: {
      title: 'A standard reinstall vs. this handover',
      lead: 'Same machine. The difference is what you see at boot and what you feel in a match.',
      colA: 'Standard / stock',
      colB: 'LiuTOS handover',
      rows: [
        { name: 'Boot and idle', a: 'Vendor apps and background services everywhere', b: 'Only what is needed, the rest waits until used' },
        { name: 'Resources in game', a: 'Background apps still get their share', b: 'Games and foreground win, background yields' },
        { name: 'Network and input', a: 'System throttling on, mouse acceleration on', b: 'Throttling off, movement 1:1' },
        { name: 'What you receive', a: 'A pile of settings to turn off yourself', b: 'Set up around your habits, ready at boot' }
      ],
      note: 'These are the actual settings shipped. Perceived gains vary by hardware, title and driver. This page shows verifiable settings, not invented FPS numbers.'
    },
    pipeline: {
      title: 'Ten stages',
      lead: 'Scroll to see what each stage changes and what you will feel. Click a number to jump.',
      stepLabel: 'Stage',
      panelLabel: 'Handover state',
      demoTag: 'illustrative',
      footNote: 'feel depends on hardware and title',
      steps: [
        {
          code: 'SYS',
          feel: ['No preloaded apps at boot', 'No ads to switch off yourself', 'License confirmed before handover'],
          title: 'Install & license',
          lead: 'A clean Windows 11 written from the official image. No vendor apps, no trial software, licensing only.',
          logs: ['› preloaded apps 0', '› image source official', '› license activated', '› auto driver install off'],
          stats: [
            { k: 'Preloaded', v: '0' },
            { k: 'Source', v: 'official' }
          ]
        },
        {
          code: 'PB',
          feel: ['Fans stay quiet at idle', 'Task Manager is not crowded', 'The features you use still work'],
          title: 'System trim',
          lead: 'Telemetry, recommendations and background reporting turned off. Only what you actually use stays, so boot and idle get quiet.',
          logs: ['› telemetry off', '› ads and recommendations removed', '› background load much lower', '› restore point created'],
          stats: [
            { k: 'Telemetry', v: 'off' },
            { k: 'Rollback', v: 'available' }
          ]
        },
        {
          code: 'PERF',
          feel: ['Background apps yield in game', 'Shutdown does not wait on timers', 'Network is not throttled'],
          title: 'Performance scheduling',
          lead: 'Stock Windows shares resources evenly. This gives games and foreground priority and pushes background work back.',
          logs: ['› foreground priority games', '› background work deferred', '› network throttling off', '› shutdown wait shortened'],
          stats: [
            { k: 'Scheduling', v: 'foreground' },
            { k: 'Rollback', v: 'to stock' }
          ]
        },
        {
          code: 'SET',
          feel: ['No settings left for you to finish', 'Explorer and context menu stay clean', 'Folders open faster'],
          title: 'Privacy and interface',
          lead: 'Temp files, privacy options, Explorer and interface settings handled in one pass. Nothing left half done for you to finish.',
          list: [
            'Temp and junk cleanup',
            'Telemetry and ad reporting off',
            'Explorer display cleaned up',
            'Taskbar and Start organised',
            'Dark mode',
            'Security updates only',
            'Drivers not auto-replaced',
            'Faster context menu and Explorer',
            'Unneeded background components removed'
          ],
          logs: ['› temp and junk cleared', '› privacy options off', '› interface set up', '› updates security only'],
          stats: [
            { k: 'Settings', v: 'one pass' },
            { k: 'Half-done', v: '0' }
          ]
        },
        {
          code: 'GPU',
          feel: ['No GeForce Experience resident', 'Driver updates bring no extras', 'One less startup item'],
          title: 'Clean GPU install',
          lead: 'The display driver only. No GeForce Experience, no telemetry, no overlay, no extra audio or USB-C packages.',
          logs: ['› old drivers removed', '› install display driver only', '› extras skipped', '› resident apps 0'],
          stats: [
            { k: 'Installed', v: 'driver only' },
            { k: 'Resident', v: '0' }
          ]
        },
        {
          code: 'NV',
          feel: ['No per-game setup', 'Settings survive driver updates', 'Same feel everywhere'],
          title: 'Global GPU profile',
          lead: 'One profile applied to every game. No clicking through each title, and updates do not overwrite it.',
          logs: ['› power management max performance', '› low latency on', '› V-Sync consistent', '› scope all games'],
          stats: [
            { k: 'Scope', v: 'global' },
            { k: 'Per-game setup', v: 'none' }
          ]
        },
        {
          code: 'PWR',
          feel: ['Boost matches your platform', 'No aggressive power saving at idle', 'Balance of power and temperature'],
          title: 'Power plan',
          lead: 'The plan follows your CPU platform. AMD and Intel schedule cores differently, and one plan applied to both fights itself.',
          logs: {
            amd: ['› platform AMD', '› plan custom performance', '› boost and parking tuned', '› applies at boot'],
            intel: ['› platform Intel', '› plan custom performance', '› boost and parking tuned', '› applies at boot']
          },
          variant: {
            label: 'Your platform',
            options: [
              { id: 'amd', label: 'AMD' },
              { id: 'intel', label: 'Intel' }
            ],
            note: 'Same process, different plan file.'
          },
          stats: [
            { k: 'Plan', v: 'custom' },
            { k: 'Back to stock', v: 'yes' }
          ]
        },
        {
          code: 'TXT',
          feel: ['Clearer glyph edges', 'Easier on the eyes over hours', 'Better CJK and Latin mix'],
          title: 'Text rendering',
          lead: 'System text rendering is redrawn. At the same size, CJK edges and Latin spacing are clearer, which is easier on the eyes over long sessions.',
          logs: ['› system font replaced', '› rendering replaced', '› scope system-wide', '› applies after sign-in'],
          stats: [
            { k: 'Scope', v: 'system-wide' },
            { k: 'Rollback', v: 'yes' }
          ]
        },
        {
          code: 'MSE',
          feel: ['Hand movement equals screen movement', 'More direct pointing', 'Steadier once used to it'],
          title: 'Mouse feel',
          lead: 'System mouse acceleration is removed. Hand moves what the screen moves, so aiming settles once you get used to it.',
          logs: ['› acceleration off', '› curve 1:1', '› scope system-wide', '› applies after sign-in'],
          stats: [
            { k: 'Acceleration', v: 'off' },
            { k: 'Curve', v: '1:1' }
          ]
        },
        {
          code: 'YOU',
          feel: ['Interface matches your habits', 'Change it anytime', 'Nothing new to learn'],
          title: 'Your habits',
          lead: 'The last pass shapes the system around how you work. Taskbar, Explorer and Start are set after asking you, not forced.',
          logs: ['› taskbar per your habits', '› explorer per your habits', '› start shortcuts added', '› applies immediately'],
          stats: [
            { k: 'Items', v: 'personal' },
            { k: 'Change later', v: 'anytime' }
          ]
        }
      ]
    },
    handsOff: {
      title: 'You only do three things',
      lead: 'I handle the technical side. You do not touch any setting or learn any tool.',
      counter: 'Your part',
      total: 'progress',
      hint: 'Three items done, then we boot and check.',
      done: 'All done. The rest is on me.',
      items: [
        { file: 'Confirm the plan', note: 'Reinstall or tuning only, plus add-ons' },
        { file: 'List software and data to keep', note: 'I work from your list, no backup needed from you' },
        { file: 'Handover check', note: 'Run your game or app on the spot' }
      ]
    },
    demos: {
      title: 'Two differences you can drag',
      lead: 'Skip the adjectives. Both comparisons here are yours to operate.',
      text: {
        title: 'Text rendering',
        before: 'Stock rendering',
        after: 'Adjusted',
        sample: 'CJK and Latin in one line, LiuTOS 2026 edges and spacing. Drag the divider.',
        caption: 'Illustrative: browser rendering stands in for both edges. Real result depends on font, DPI and panel.'
      },
      mouse: {
        title: 'Mouse acceleration',
        on: 'Acceleration on',
        off: 'Acceleration off',
        caption:
          'One hand movement, replayed twice. With acceleration the slow part shrinks and the fast part overshoots. Off, movement and screen stay 1:1.'
      }
    },
    hardware: {
      title: 'GPU and power, handled apart',
      lead: 'These three are branches, not a checklist. They follow your GPU and CPU.',
      items: [
        {
          n: '01',
          title: 'Clean GPU install',
          body: 'The display driver only, nothing else.',
          list: ['No GeForce Experience', 'No telemetry', 'No overlay', 'No extra audio or USB-C']
        },
        {
          n: '02',
          title: 'Global GPU profile',
          body: 'Applied to every game, once.',
          list: ['Power management: max performance', 'Low latency mode', 'V-Sync', 'Pre-rendered frames']
        },
        {
          n: '03',
          title: 'Power plan',
          body: 'The plan follows your CPU platform.',
          list: ['AMD: tuned for CCD behaviour', 'Intel: tuned for P/E cores', 'Core parking and latency tolerance', 'One import, reversible']
        }
      ]
    },
    addons: {
      title: 'Add-ons',
      lead: 'Four optional items. Anything you check lands in the ticket and the booking message.',
      priceNote: 'quoted separately',
      items: [
        { id: 'backup', title: 'Backup before wipe', body: 'Documents, browser profiles, game saves. Put back after the install.' },
        { id: 'apps', title: 'Install your list', body: 'Hand me the list. Installed and opened once to verify.' },
        { id: 'curated', title: 'Recommended apps', body: 'Each one explained, installed only if you pick it.' },
        { id: 'liut', title: 'LiuT tools', body: 'In-house tools, installed with a walkthrough.' }
      ]
    },
    pricing: {
      title: 'Pricing',
      lead: 'Two options. The only question is whether your current install survives.',
      currency: 'NTD',
      select: 'Choose this',
      tiers: [
        {
          id: 'tune',
          name: 'Tuning only',
          steps: '02 — 10',
          desc: 'Stage 1 skipped. System, data and installed apps stay. The other nine stages run.',
          includes: [
            'System trim',
            'Performance scheduling',
            'Privacy and interface',
            'Clean GPU install and profile',
            'Custom power plan',
            'Text, mouse, your habits'
          ]
        },
        {
          id: 'full',
          name: 'Full reinstall',
          steps: '01 — 10',
          desc: 'Starts at a clean Windows install and license, then runs all ten.',
          includes: [
            'Everything in Tuning only',
            'Windows 11 install and license',
            'Boot baseline and drivers',
            'All ten stages',
            'Handover check'
          ],
          featured: true
        }
      ],
      note: 'Add-ons, travel or remote handling quoted separately.'
    },
    ticket: {
      label: 'Your build',
      empty: 'nothing selected',
      addonsLabel: 'Add-ons',
      total: 'Total',
      cta: 'Book'
    },
    booking: {
      title: 'Fill it, copy it, drop it in Discord',
      lead: 'No backend, no monthly form service. This page only assembles the message.',
      fields: {
        name: 'Name',
        discord: 'Your Discord',
        cpu: 'CPU',
        gpu: 'GPU',
        goal: 'Game or app you care about',
        note: 'Anything else'
      },
      placeholders: {
        name: 'What should I call you',
        discord: 'e.g. liut_9527',
        cpu: 'e.g. 7800X3D',
        gpu: 'e.g. RTX 4070 Ti',
        goal: 'e.g. CS2, Valorant, editing',
        note: 'e.g. apps I want to keep'
      },
      copy: 'Copy message',
      copied: 'Copied. Paste it in Discord.',
      open: 'Open Discord',
      copyFail: 'Copy failed. Select the message below manually.',
      preview: 'Message preview'
    },
    footer: {
      line: 'Ten stages. One handover.',
      disclaimer:
        'This page describes the settings shipped and their measured values. Performance and feel vary by hardware, title and driver version. No guarantee is made.',
      contact: 'Discord',
      replay: 'Replay intro'
    },
    labels: {
      expand: 'Show details',
      collapse: 'Hide details',
      todo: 'pending',
      done: 'done'
    }
  }
}
