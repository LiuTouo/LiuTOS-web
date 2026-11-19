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
      { id: 'pipeline', label: '工序' },
      { id: 'demos', label: '實測' },
      { id: 'hardware', label: '硬體' },
      { id: 'pricing', label: '價目' },
      { id: 'booking', label: '預約' }
    ],
    hero: {
      kicker: '系統重灌 · 深度優化 · 交機驗收',
      title: ['十道工序，', '三次點擊。'],
      lead:
        '從乾淨的 Windows 安裝，到最後一項 registry 值。中間由腳本執行，你只需要按三次。交機時留下的是低延遲、精簡、跟你的使用習慣。',
      scroll: '往下',
      stats: [
        { v: '10', k: '道工序' },
        { v: '3', k: '次點擊' },
        { v: '2', k: '支腳本可還原原廠值' }
      ],
      log: [
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 1 /f',
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f',
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Low Latency" /v "Priority" /t REG_DWORD /d 8 /f',
        'reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f',
        'sc config diagsvc start= disabled',
        'powercfg -import "LiuT_AMD_PowerPlan.pow"',
        'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip6\\Parameters" /v DisabledComponents /t REG_DWORD /d 255 /f',
        'set TaskbarAl=1',
        'set Hidden=2',
        'DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase'
      ]
    },
    baseline: {
      title: '原廠預設，不是為你調過的',
      lead: '同一台機器，差別在幾個數字和幾個啟動類型。以下是實際寫入的值。',
      colA: '原廠預設',
      colB: 'LiuTOS 交機',
      rows: [
        { name: '遙測與背景服務', a: 'DiagTrack 執行中，百餘項服務 Automatic', b: 'DiagTrack 停用，其餘改為需要時才啟動' },
        { name: '多媒體排程', a: 'SystemResponsiveness = 20', b: 'SystemResponsiveness = 1' },
        { name: '網路節流', a: 'NetworkThrottlingIndex = 10', b: 'NetworkThrottlingIndex = 0xFFFFFFFF' },
        { name: '滑鼠輸入', a: '兩段加速曲線', b: 'MouseSpeed = 0，位移 1:1' }
      ],
      note: '以上 registry 值取自實際執行輸出。效能差異依硬體、遊戲與驅動版本而異，本頁不放你還沒實測過的幀數。'
    },
    pipeline: {
      title: '十道工序',
      lead: '滾動看每一步實際寫入什麼。左邊點編號可跳步。',
      stepLabel: '工序',
      panelLabel: '系統狀態',
      demoTag: '示意',
      footNote: '實際值依硬體與驅動版本而異',
      steps: [
        {
          code: 'SYS',
          title: '系統與授權',
          lead: '乾淨的 Windows 11 從 ISO 寫入開始。完成 OOBE 後只做授權開通，不加任何預裝項目。',
          logs: [
            '> 寫入 Windows 11 映像至 USB',
            '> 完成 OOBE，略過推薦項目與廣告',
            '> 授權狀態：已開通',
            '> 停用自動驅動安裝（Windows Update）'
          ],
          stats: [
            { k: '預裝項目', v: '0' },
            { k: '系統來源', v: '官方 ISO' }
          ]
        },
        {
          code: 'PB',
          title: 'LiuTOS playbook',
          lead: '以 playbook 套用系統精簡：遙測、Defender 常駐、Edge 元件、AppX 一次處理，過程留下可還原紀錄。',
          logs: [
            '> 套用 LiuTOS playbook（overhaul）',
            '> registry 精簡 6,736 筆',
            '> AppX 移除 · 服務停用 · 遙測關閉',
            '> 建立還原點',
            '> 完成，差異報告留存'
          ],
          stats: [
            { k: 'registry 筆數', v: '6,736' },
            { k: '還原', v: '可回滾' }
          ]
        },
        {
          code: 'OPT',
          title: 'Optimizer：只跑兩支',
          lead: '兩支 cmd，一支管排程優先權，一支管節流與遙測。兩支都帶 revert，能把值還原成原廠。',
          logs: [
            '> LiuT-PerfTweaks.cmd',
            '> reg add "HKLM\\...\\Multimedia\\SystemProfile" /v SystemResponsiveness /d 1',
            '> reg add "HKLM\\...\\Tasks\\Games" /v "GPU Priority" /d 8',
            '> reg add "HKLM\\...\\Tasks\\Low Latency" /v "Priority" /d 8',
            '> LiuT-PerfExtras.cmd',
            '> reg add "HKLM\\...\\SystemProfile" /v NetworkThrottlingIndex /d 4294967295',
            '> 完成。MMCSS 需重開機生效'
          ],
          tags: [
            { k: 'MMCSS', v: 'SystemResponsiveness 20 → 1' },
            { k: 'Games 排程', v: 'GPU 8 · Priority 6 · High' },
            { k: 'Low Latency', v: 'Priority 8 · SFIO High' },
            { k: '網路節流', v: 'NetworkThrottlingIndex 關閉' }
          ],
          stats: [
            { k: '腳本', v: '2 支' },
            { k: 'revert', v: '內建' }
          ]
        },
        {
          code: 'WU',
          title: 'WinUtil：你按一次',
          lead: '一支 winutil-selected-apply.cmd，按一次跑完九件事，每一步回報成功或失敗。',
          logs: [
            '> [1] %TEMP% 與 %SystemRoot%\\Temp 清除',
            '> [2] Explorer 自動探索停用（Bags / BagMRU）',
            '> [3] Widgets 移除 · explorer 重啟',
            '> [4] DisabledComponents=255 · Teredo 停用',
            '> [5] Edge 原則 16 項',
            '> [9] DISM /ResetBase',
            '> 全部完成，失敗步驟：0'
          ],
          list: [
            '暫存檔清除',
            'Explorer 自動探索停用',
            'Widgets 移除',
            'IPv6 / Teredo / 優先 IPv4 合併為 255',
            'Edge 原則 16 項',
            'Home 與 Gallery 從 Explorer 移除',
            '深色主題',
            'O&O ShutUp10++',
            'DISM /ResetBase'
          ],
          stats: [
            { k: '你的操作', v: '1 次' },
            { k: '失敗步驟', v: '0' }
          ]
        },
        {
          code: 'GPU',
          title: '顯卡：乾淨安裝',
          lead: 'NVCleanstall 只裝驅動本體。GeForce Experience、Telemetry、覆疊層、多餘音訊與 USB-C 元件一律不裝。',
          logs: [
            '> 移除既有 NVIDIA 套件',
            '> 安裝：Display Driver',
            '> 不安裝：GeForce Experience · Telemetry · Overlay',
            '> 不安裝：多餘音訊與 USB-C 元件',
            '> 重新開機'
          ],
          stats: [
            { k: '安裝元件', v: '僅驅動' },
            { k: '常駐程式', v: '0' }
          ]
        },
        {
          code: 'NV',
          title: '顯卡：全域設定',
          lead: 'LiuT.nip 匯入 NVIDIA Profile Inspector，一次套到全域設定檔，不用逐款遊戲點。',
          logs: [
            '> nvidiaProfileInspector · 匯入 LiuT.nip',
            '> 電源管理：最高效能',
            '> 低延遲模式 · 垂直同步 · 預先渲染影格',
            '> 套用至 _GLOBAL_DRIVER_PROFILE',
            '> 重新啟動顯示驅動'
          ],
          stats: [
            { k: '套用範圍', v: '全域' },
            { k: '設定檔', v: 'LiuT.nip' }
          ]
        },
        {
          code: 'PWR',
          title: '電源計畫：看你的 CPU',
          lead: '依平台匯入對應的 .pow。AMD 與 Intel 的升頻、核心停放與延遲容忍行為不同，同一份計畫套兩邊會互相拖累。',
          logs: {
            amd: [
              '> assoc .pow → powercfg -import',
              '> 匯入 LiuT_AMD_PowerPlan.pow',
              '> powercfg /setactive',
              '> 延遲容忍與核心停放依 CCD 行為調整',
              '> 完成，重開機生效'
            ],
            intel: [
              '> assoc .pow → powercfg -import',
              '> 匯入 LiuT_Intel_PowerPlan.pow',
              '> powercfg /setactive',
              '> 延遲容忍與核心停放依 P/E 核心調整',
              '> 完成，重開機生效'
            ]
          },
          variant: {
            label: '你的平台',
            options: [
              { id: 'amd', label: 'AMD' },
              { id: 'intel', label: 'Intel' }
            ],
            note: '同一支 doubleclicktousepow.bat 匯入，差別在挑哪一份檔案。'
          },
          stats: [
            { k: '計畫', v: '客製 .pow' },
            { k: '套用方式', v: '一鍵匯入' }
          ]
        },
        {
          code: 'TXT',
          title: '文字：重畫一次',
          lead: '換掉系統預設的字型優先序，改由 MacType 接管字形渲染。同樣字級下，中文邊緣與英文字距都不是原本那樣。',
          logs: [
            '> noMeiryoUI · 系統字型覆寫',
            '> MacType · 接管 GDI 渲染',
            '> 描邊與 gamma 校正',
            '> 登出後全域生效'
          ],
          stats: [
            { k: '渲染', v: 'MacType 接管' },
            { k: '範圍', v: '全系統' }
          ]
        },
        {
          code: 'MSE',
          title: '滑鼠：拿掉加速',
          lead: '關閉增強指標精確度與 Windows 的兩段加速曲線。滑鼠位移與畫面位移回到 1:1。',
          logs: [
            '> HKCU\\Control Panel\\Mouse',
            '> MouseSpeed / MouseThreshold1 / MouseThreshold2 = 0',
            '> MouseAccel / MouseAccel_Scale / MouseAccel_Max = 0',
            '> 登出後生效'
          ],
          stats: [
            { k: '曲線', v: '線性 1:1' },
            { k: '生效', v: '登出後' }
          ]
        },
        {
          code: 'LAST',
          title: '收尾：你的習慣',
          lead: 'LiuTCustomLastSet.bat 三件事：工作列置中、隱藏項目關閉、開始資料夾加入「設定」。改完自動重啟 explorer。',
          logs: [
            '> TaskbarAl = 1（工作列置中）',
            '> Hidden = 2（不顯示隱藏項目）',
            '> Start\\VisiblePlaces += Settings GUID',
            '> 重啟 explorer 與 StartMenuExperienceHost',
            '> 全部 3 項處理完畢'
          ],
          stats: [
            { k: '設定項', v: '3' },
            { k: '重啟', v: '自動' }
          ]
        }
      ]
    },
    handsOff: {
      title: '作業很多，操作很少',
      lead: '重量不是工作量。整套流程裡需要你按下去的，只有這三支。',
      counter: '你的操作',
      total: '工序',
      hint: '點完三格，剩下的交給腳本。',
      done: '三支都按完了。系統在那邊等重開機。',
      items: [
        { file: 'LiuT-PerfTweaks.cmd', note: '多媒體排程優先權' },
        { file: 'LiuT-PerfExtras.cmd', note: '節流、遙測、還原點' },
        { file: 'winutil-selected-apply.cmd', note: '九件事一次做完' }
      ]
    },
    demos: {
      title: '兩個你拖得動的差別',
      lead: '不用信形容詞。這頁的兩個對照都能自己操作。',
      text: {
        title: '文字渲染',
        before: '原廠渲染',
        after: 'MacType 接管後',
        sample: '這一行的中英混排 LiuTOS 2026 邊緣與字距，拖曳中間那條線比較。',
        caption: '示意：以瀏覽器渲染模擬兩者的邊緣差異，實際效果依字型、DPI 與螢幕而異。'
      },
      mouse: {
        title: '滑鼠加速',
        on: '加速開啟',
        off: '加速關閉',
        caption: '同一段手部移動。加速開啟時慢速段被縮小、快速段被放大，落點偏移；關閉後位移與畫面 1:1。'
      }
    },
    hardware: {
      title: '顯卡與電源，分開處理',
      lead: '這三塊不是勾選清單，是依你的 CPU 與顯卡走不同分支。',
      items: [
        {
          n: '01',
          title: '乾淨安裝',
          body: 'NVCleanstall 只勾驅動本體，其餘全部不裝。',
          list: ['不安裝 GeForce Experience', '不安裝 Telemetry', '不安裝覆疊層', '不安裝多餘音訊與 USB-C 元件']
        },
        {
          n: '02',
          title: '全域設定檔',
          body: 'nvidiaProfileInspector 匯入 LiuT.nip，一次套到全域。',
          list: ['電源管理：最高效能', '低延遲模式', '垂直同步', '預先渲染影格']
        },
        {
          n: '03',
          title: '電源計畫',
          body: '依 CPU 平台選 .pow，不是一份套全部。',
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
          desc: '跳過第 1 步。系統、資料、已裝程式全部保留，其餘九道工序照跑。',
          includes: ['LiuTOS playbook 精簡', 'Optimizer 兩支腳本', 'WinUtil 一次點擊', '顯卡乾淨安裝與全域設定', '客製電源計畫', '文字渲染、滑鼠、收尾設定']
        },
        {
          id: 'full',
          name: '全套重灌',
          steps: '01 — 10',
          desc: '從 ISO 寫入與授權開通開始，十道工序跑完整套。',
          includes: ['含不重灌優化的全部內容', 'Windows 11 ISO 寫入', '授權開通', 'OOBE 與驅動基線', '交機驗收'],
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
      line: '十道工序，三次點擊。',
      disclaimer:
        '本頁 registry 值取自實際執行輸出。幀數、延遲與體感差異依硬體、遊戲與驅動版本而異，不做保證。',
      contact: 'Discord'
    },
    labels: {
      expand: '展開紀錄',
      collapse: '收合紀錄'
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
      title: ['Ten stages.', 'Three clicks.'],
      lead:
        'From a bare Windows install to the last registry value. The work runs as scripts. You press three buttons. What ships is a lean system with low input latency, already shaped around how you use it.',
      scroll: 'Scroll',
      stats: [
        { v: '10', k: 'stages' },
        { v: '3', k: 'clicks' },
        { v: '2', k: 'scripts with revert' }
      ],
      log: [
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 1 /f',
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f',
        'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Low Latency" /v "Priority" /t REG_DWORD /d 8 /f',
        'reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f',
        'sc config diagsvc start= disabled',
        'powercfg -import "LiuT_Intel_PowerPlan.pow"',
        'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip6\\Parameters" /v DisabledComponents /t REG_DWORD /d 255 /f',
        'set TaskbarAl=1',
        'set Hidden=2',
        'DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase'
      ]
    },
    baseline: {
      title: 'Stock Windows was not tuned for you',
      lead: 'Same machine. The difference is a handful of values and a few startup types. These are the actual writes.',
      colA: 'Stock',
      colB: 'LiuTOS',
      rows: [
        { name: 'Telemetry & background services', a: 'DiagTrack running, 100+ services Automatic', b: 'DiagTrack disabled, rest move to on-demand' },
        { name: 'Multimedia scheduling', a: 'SystemResponsiveness = 20', b: 'SystemResponsiveness = 1' },
        { name: 'Network throttling', a: 'NetworkThrottlingIndex = 10', b: 'NetworkThrottlingIndex = 0xFFFFFFFF' },
        { name: 'Mouse input', a: 'Two-step acceleration curve', b: 'MouseSpeed = 0, 1:1 movement' }
      ],
      note: 'Values above come from real output. Gains vary by hardware, title and driver. This page shows no FPS number you have not measured yourself.'
    },
    pipeline: {
      title: 'Ten stages',
      lead: 'Scroll to see what each stage actually writes. Click a number on the left to jump.',
      stepLabel: 'Stage',
      panelLabel: 'System state',
      demoTag: 'illustrative',
      footNote: 'values vary by hardware and driver',
      steps: [
        {
          code: 'SYS',
          title: 'Install & license',
          lead: 'A clean Windows 11 written from ISO. After OOBE, licensing only. No preloaded extras.',
          logs: [
            '> Write Windows 11 image to USB',
            '> Finish OOBE, skip recommendations and ads',
            '> License status: activated',
            '> Disable automatic driver installation (Windows Update)'
          ],
          stats: [
            { k: 'Preloaded extras', v: '0' },
            { k: 'Image source', v: 'Official ISO' }
          ]
        },
        {
          code: 'PB',
          title: 'LiuTOS playbook',
          lead: 'A playbook strips the base system: telemetry, Defender resident load, Edge components, AppX. Every run leaves a record and stays reversible.',
          logs: [
            '> Apply LiuTOS playbook (overhaul)',
            '> 6,736 registry entries trimmed',
            '> AppX removed · services disabled · telemetry off',
            '> Restore point created',
            '> Done, diff report kept'
          ],
          stats: [
            { k: 'Registry entries', v: '6,736' },
            { k: 'Rollback', v: 'Available' }
          ]
        },
        {
          code: 'OPT',
          title: 'Optimizer: two scripts',
          lead: 'Two cmds. One handles scheduler priority, one handles throttling and telemetry. Both carry a revert path back to stock values.',
          logs: [
            '> LiuT-PerfTweaks.cmd',
            '> reg add "HKLM\\...\\Multimedia\\SystemProfile" /v SystemResponsiveness /d 1',
            '> reg add "HKLM\\...\\Tasks\\Games" /v "GPU Priority" /d 8',
            '> reg add "HKLM\\...\\Tasks\\Low Latency" /v "Priority" /d 8',
            '> LiuT-PerfExtras.cmd',
            '> reg add "HKLM\\...\\SystemProfile" /v NetworkThrottlingIndex /d 4294967295',
            '> Done. MMCSS applies after reboot'
          ],
          tags: [
            { k: 'MMCSS', v: 'SystemResponsiveness 20 → 1' },
            { k: 'Games task', v: 'GPU 8 · Priority 6 · High' },
            { k: 'Low Latency', v: 'Priority 8 · SFIO High' },
            { k: 'Throttling', v: 'NetworkThrottlingIndex off' }
          ],
          stats: [
            { k: 'Scripts', v: '2' },
            { k: 'Revert', v: 'Built in' }
          ]
        },
        {
          code: 'WU',
          title: 'WinUtil: one click',
          lead: 'One winutil-selected-apply.cmd. One press runs nine tasks in order and reports each one.',
          logs: [
            '> [1] Clear %TEMP% and %SystemRoot%\\Temp',
            '> [2] Disable Explorer auto discovery (Bags / BagMRU)',
            '> [3] Remove Widgets · restart explorer',
            '> [4] DisabledComponents=255 · Teredo off',
            '> [5] 16 Edge policies',
            '> [9] DISM /ResetBase',
            '> All done, failed steps: 0'
          ],
          list: [
            'Temp file cleanup',
            'Explorer auto discovery off',
            'Widgets removed',
            'IPv6 / Teredo / prefer IPv4 merged into 255',
            '16 Edge policies',
            'Home and Gallery removed from Explorer',
            'Dark theme',
            'O&O ShutUp10++',
            'DISM /ResetBase'
          ],
          stats: [
            { k: 'Your input', v: 'one press' },
            { k: 'Failed steps', v: '0' }
          ]
        },
        {
          code: 'GPU',
          title: 'GPU: clean install',
          lead: 'NVCleanstall installs the display driver and nothing else. No GeForce Experience, no telemetry, no overlay, no extra audio or USB-C packages.',
          logs: [
            '> Remove existing NVIDIA packages',
            '> Install: Display Driver',
            '> Skip: GeForce Experience · Telemetry · Overlay',
            '> Skip: extra audio and USB-C components',
            '> Reboot'
          ],
          stats: [
            { k: 'Components', v: 'driver only' },
            { k: 'Resident apps', v: '0' }
          ]
        },
        {
          code: 'NV',
          title: 'GPU: global profile',
          lead: 'LiuT.nip goes into NVIDIA Profile Inspector once, at the global level. No clicking through each game.',
          logs: [
            '> nvidiaProfileInspector · import LiuT.nip',
            '> Power management: prefer maximum performance',
            '> Low latency · V-Sync · pre-rendered frames',
            '> Apply to _GLOBAL_DRIVER_PROFILE',
            '> Restart display driver'
          ],
          stats: [
            { k: 'Scope', v: 'global' },
            { k: 'Profile', v: 'LiuT.nip' }
          ]
        },
        {
          code: 'PWR',
          title: 'Power plan: depends on your CPU',
          lead: 'The matching .pow gets imported per platform. AMD and Intel differ in boost, core parking and latency tolerance. One plan applied to both fights itself.',
          logs: {
            amd: [
              '> assoc .pow → powercfg -import',
              '> Import LiuT_AMD_PowerPlan.pow',
              '> powercfg /setactive',
              '> Latency tolerance and core parking tuned for CCD',
              '> Done, reboot to apply'
            ],
            intel: [
              '> assoc .pow → powercfg -import',
              '> Import LiuT_Intel_PowerPlan.pow',
              '> powercfg /setactive',
              '> Latency tolerance and core parking tuned for P/E cores',
              '> Done, reboot to apply'
            ]
          },
          variant: {
            label: 'Your platform',
            options: [
              { id: 'amd', label: 'AMD' },
              { id: 'intel', label: 'Intel' }
            ],
            note: 'Same doubleclicktousepow.bat imports either file. Only the source file differs.'
          },
          stats: [
            { k: 'Plan', v: 'custom .pow' },
            { k: 'Apply', v: 'one import' }
          ]
        },
        {
          code: 'TXT',
          title: 'Text: redrawn',
          lead: 'The system font fallback order gets replaced and MacType takes over glyph rendering. At the same size, CJK edges and Latin spacing are not what they were.',
          logs: [
            '> noMeiryoUI · system font override',
            '> MacType · take over GDI rendering',
            '> Stem and gamma correction',
            '> Applies system-wide after sign-out'
          ],
          stats: [
            { k: 'Rendering', v: 'MacType' },
            { k: 'Scope', v: 'system-wide' }
          ]
        },
        {
          code: 'MSE',
          title: 'Mouse: acceleration off',
          lead: 'Enhanced pointer precision and the two-step Windows curve are removed. Pointer movement and screen movement go back to 1:1.',
          logs: [
            '> HKCU\\Control Panel\\Mouse',
            '> MouseSpeed / MouseThreshold1 / MouseThreshold2 = 0',
            '> MouseAccel / MouseAccel_Scale / MouseAccel_Max = 0',
            '> Applies after sign-out'
          ],
          stats: [
            { k: 'Curve', v: 'linear 1:1' },
            { k: 'Apply', v: 'after sign-out' }
          ]
        },
        {
          code: 'LAST',
          title: 'Last: your habits',
          lead: 'LiuTCustomLastSet.bat does three things: taskbar centered, hidden items off, Settings pinned into the Start folders list. Explorer restarts itself.',
          logs: [
            '> TaskbarAl = 1 (taskbar centered)',
            '> Hidden = 2 (hide hidden items)',
            '> Start\\VisiblePlaces += Settings GUID',
            '> Restart explorer and StartMenuExperienceHost',
            '> All 3 items done'
          ],
          stats: [
            { k: 'Items', v: '3' },
            { k: 'Restart', v: 'automatic' }
          ]
        }
      ]
    },
    handsOff: {
      title: 'Plenty of work. Three clicks.',
      lead: 'Weight is not workload. These three are the only things you press in the whole run.',
      counter: 'Your input',
      total: 'Stages',
      hint: 'Three boxes, then the scripts take it.',
      done: 'All three pressed. The system is waiting on a reboot.',
      items: [
        { file: 'LiuT-PerfTweaks.cmd', note: 'scheduler priority' },
        { file: 'LiuT-PerfExtras.cmd', note: 'throttling, telemetry, restore points' },
        { file: 'winutil-selected-apply.cmd', note: 'nine tasks at once' }
      ]
    },
    demos: {
      title: 'Two differences you can drag',
      lead: 'Skip the adjectives. Both comparisons here are yours to operate.',
      text: {
        title: 'Text rendering',
        before: 'Stock rendering',
        after: 'After MacType',
        sample: 'CJK and Latin in one line, LiuTOS 2026 edges and spacing. Drag the divider.',
        caption: 'Illustrative: browser rendering stands in for both edges. Real result depends on font, DPI and panel.'
      },
      mouse: {
        title: 'Mouse acceleration',
        on: 'Acceleration on',
        off: 'Acceleration off',
        caption: 'One hand movement, replayed twice. With acceleration the slow part shrinks and the fast part overshoots. Off, movement and screen stay 1:1.'
      }
    },
    hardware: {
      title: 'GPU and power, handled apart',
      lead: 'These three are branches, not a checklist. They follow your CPU and GPU.',
      items: [
        {
          n: '01',
          title: 'Clean install',
          body: 'NVCleanstall gets the display driver only.',
          list: ['No GeForce Experience', 'No telemetry', 'No overlay', 'No extra audio or USB-C components']
        },
        {
          n: '02',
          title: 'Global profile',
          body: 'nvidiaProfileInspector imports LiuT.nip at the global level.',
          list: ['Power management: max performance', 'Low latency mode', 'V-Sync', 'Pre-rendered frames']
        },
        {
          n: '03',
          title: 'Power plan',
          body: 'The .pow follows your CPU platform.',
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
          includes: ['LiuTOS playbook trim', 'Both Optimizer scripts', 'One WinUtil pass', 'Clean GPU install and global profile', 'Custom power plan', 'Text, mouse and habit settings']
        },
        {
          id: 'full',
          name: 'Full reinstall',
          steps: '01 — 10',
          desc: 'Starts at the ISO write and the license, then runs all ten.',
          includes: ['Everything in Tuning only', 'Windows 11 ISO write', 'License activation', 'OOBE and driver baseline', 'Handover verification'],
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
      line: 'Ten stages. Three clicks.',
      disclaimer:
        'Registry values on this page come from real output. FPS, latency and perceived smoothness vary by hardware, title and driver version. No guarantee is made.',
      contact: 'Discord'
    },
    labels: {
      expand: 'Show log',
      collapse: 'Hide log'
    }
  }
}
