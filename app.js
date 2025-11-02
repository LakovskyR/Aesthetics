// Application State
const state = {
  currentScenario: 'sfe_lead',
  selectedTask: null,
  tasks: [
    {
      id: 'discover.t1',
      workstream: 'discover',
      title: 'Kickoff & stakeholder interviews',
      owner: 'Roman',
      start_week: 1,
      end_week: 2,
      status: 'in_progress',
      progress: 45,
      what: 'Meet AMs, Field Ops, Finance, CRM owner',
      why: 'Align priorities, gather access list',
      so_what: 'Complete data access & KPI glossary',
      acceptance: 'Stakeholders confirm KPI definitions via email',
      deliverables: 'Access list, KPI definitions document',
      risks: [
        { text: 'Access delays', severity: 'high', mitigation: 'Manual CSV extracts & escalate to IT' }
      ],
      action_mariana: 'Confirm KPI definitions by email this week'
    },
    {
      id: 'discover.t2',
      workstream: 'discover',
      title: 'Data source discovery & access setup',
      owner: 'Roman',
      start_week: 1,
      end_week: 3,
      status: 'in_progress',
      progress: 30,
      what: 'Map all data sources (CRM, billing, quotas)',
      why: 'Enable automated reporting',
      so_what: 'Foundation for all analytics',
      acceptance: 'Successfully query all required data sources',
      deliverables: 'Data source documentation, access credentials',
      risks: []
    },
    {
      id: 'reporting.t1',
      workstream: 'reporting',
      title: 'Build automated AM performance reports',
      owner: 'Roman',
      start_week: 2,
      end_week: 4,
      status: 'not_started',
      progress: 0,
      what: 'Create automated dashboards for AM metrics',
      why: 'Replace manual weekly reporting',
      so_what: '80% time savings on routine reports',
      acceptance: 'AMs can access real-time metrics independently',
      deliverables: 'Power BI dashboard, user guide',
      risks: [
        { text: 'Data quality issues', severity: 'medium', mitigation: 'Data validation layer & alerts' }
      ]
    },
    {
      id: 'reporting.t2',
      workstream: 'reporting',
      title: 'Deploy one-pager template',
      owner: 'Roman',
      start_week: 3,
      end_week: 4,
      status: 'not_started',
      progress: 0,
      what: 'Standardized weekly performance summary',
      why: 'Consistent communication format',
      so_what: 'Clear visibility into key metrics',
      acceptance: 'AMs use template for weekly updates',
      deliverables: 'Excel/PowerPoint template',
      risks: []
    },
    {
      id: 'pilot.t1',
      workstream: 'pilot',
      title: 'Design pilot framework',
      owner: 'Roman + AMs',
      start_week: 4,
      end_week: 6,
      status: 'not_started',
      progress: 0,
      what: 'Define pilot objectives, metrics, and selection criteria',
      why: 'Test new approaches at controlled scale',
      so_what: 'Evidence-based scaling decisions',
      acceptance: 'Pilot playbook approved by stakeholders',
      deliverables: 'Pilot playbook, success metrics',
      risks: [
        { text: 'Poor pilot design', severity: 'high', mitigation: 'Peer review & stakeholder workshops' }
      ]
    },
    {
      id: 'pilot.t2',
      workstream: 'pilot',
      title: 'Execute pilot & weekly check-ins',
      owner: 'Roman + AMs',
      start_week: 6,
      end_week: 12,
      status: 'not_started',
      progress: 0,
      what: 'Run pilot with 35 target accounts',
      why: 'Validate approach before full rollout',
      so_what: 'Proof of concept for org-wide change',
      acceptance: 'Weekly metrics showing measurable improvement',
      deliverables: 'Weekly progress reports, final analysis',
      risks: [
        { text: 'Low engagement', severity: 'medium', mitigation: 'Regular AM touchpoints & incentives' }
      ]
    },
    {
      id: 'sip.t1',
      workstream: 'sip',
      title: 'Analyze SIP mechanics & propose changes',
      owner: 'Roman',
      start_week: 5,
      end_week: 8,
      status: 'not_started',
      progress: 0,
      what: 'Review current SIP structure and identify improvements',
      why: 'Align incentives with strategic goals',
      so_what: 'Better motivation and outcomes',
      acceptance: 'SIP proposal approved by Finance & Leadership',
      deliverables: 'SIP analysis document, proposal slides',
      risks: [
        { text: 'Finance pushback', severity: 'high', mitigation: 'Show ROI calculations & pilot data' }
      ]
    },
    {
      id: 'sip.t2',
      workstream: 'sip',
      title: 'Implement SIP changes',
      owner: 'Roman + Finance',
      start_week: 9,
      end_week: 12,
      status: 'not_started',
      progress: 0,
      what: 'Deploy new SIP structure',
      why: 'Drive better performance',
      so_what: 'Measurable impact on results',
      acceptance: 'SIP changes live in system',
      deliverables: 'Updated SIP calculator, communication plan',
      risks: []
    },
    {
      id: 'enablement.t1',
      workstream: 'enablement',
      title: 'Create training materials',
      owner: 'Roman',
      start_week: 2,
      end_week: 5,
      status: 'not_started',
      progress: 0,
      what: 'Develop training for new reports and processes',
      why: 'Ensure adoption and proper usage',
      so_what: 'Self-sufficient stakeholders',
      acceptance: 'Training materials reviewed and approved',
      deliverables: 'Training decks, video tutorials, quick reference guides',
      risks: []
    },
    {
      id: 'enablement.t2',
      workstream: 'enablement',
      title: 'Conduct training sessions',
      owner: 'Roman',
      start_week: 5,
      end_week: 7,
      status: 'not_started',
      progress: 0,
      what: 'Train AMs and stakeholders on new tools',
      why: 'Drive adoption',
      so_what: 'Team equipped for success',
      acceptance: 'Training attendance > 90%, feedback score > 4/5',
      deliverables: 'Training sessions completed, feedback summary',
      risks: [
        { text: 'Low attendance', severity: 'medium', mitigation: 'Manager endorsement & mandatory attendance' }
      ]
    }
  ],
  milestones: {
    sfe_lead: [
      { week: 1, title: 'KPI glossary sign-off', owner: 'Roman', acceptance: 'Email confirmation' },
      { week: 4, title: 'Automated reports deployed', owner: 'Roman', acceptance: 'AM uses one-pager' },
      { week: 6, title: 'Pilot kickoff', owner: 'Roman + AMs', acceptance: 'Pilot playbook signed' },
      { week: 9, title: 'Mid-pilot interim analysis', owner: 'Roman', acceptance: 'Interim memo delivered' },
      { week: 12, title: 'Pilot wrap-up & scale decision', owner: 'Roman', acceptance: 'Go/No-Go decision documented' }
    ],
    bi_manager: [
      { week: 1, title: 'Data architecture review', owner: 'Roman', acceptance: 'Architecture doc approved' },
      { week: 3, title: 'ETL pipeline deployed', owner: 'Roman', acceptance: 'Data flowing automatically' },
      { week: 6, title: 'Advanced analytics framework', owner: 'Roman', acceptance: 'Predictive models live' },
      { week: 9, title: 'Self-service BI platform', owner: 'Roman', acceptance: 'Users creating own reports' },
      { week: 12, title: 'Enterprise BI roadmap', owner: 'Roman', acceptance: 'Roadmap approved by exec team' }
    ]
  },
  kpis: {
    sfe_lead: {
      pilotSize: 35,
      incrementalRev: 148260,
      avgPotentialScore: 0.29,
      reportAutomation: { current: 30, target: 100 },
      pilotCoverage: { current: 0, target: 100 },
      timeToReport: { current: 48, target: 24 },
      sipReadiness: { current: 20, target: 80 }
    },
    bi_manager: {
      pilotSize: 35,
      incrementalRev: 148260,
      avgPotentialScore: 0.29,
      reportAutomation: { current: 20, target: 100 },
      pilotCoverage: { current: 0, target: 100 },
      timeToReport: { current: 48, target: 12 },
      sipReadiness: { current: 15, target: 90 }
    }
  },
  risks: [
    {
      risk: 'Access & Data Quality',
      severity: 'high',
      mitigation: 'Manual extracts, data profiling, escalate to IT',
      owner: 'Roman',
      status: 'open'
    },
    {
      risk: 'Stakeholder misalignment',
      severity: 'medium',
      mitigation: 'KPI glossary, short workshops',
      owner: 'Roman',
      status: 'mitigating'
    },
    {
      risk: 'Timeline compression',
      severity: 'medium',
      mitigation: 'Focus on MVP, defer nice-to-haves',
      owner: 'Roman',
      status: 'monitoring'
    },
    {
      risk: 'Resource constraints',
      severity: 'low',
      mitigation: 'Prioritize critical path tasks',
      owner: 'Roman',
      status: 'monitoring'
    }
  ],
  workstreamNames: {
    discover: 'Data & Access',
    reporting: 'Reporting & Automation',
    pilot: 'Pilot Design & Execution',
    sip: 'SIP & Incentives',
    enablement: 'Stakeholder Enablement'
  }
};

// Initialize Application
function init() {
  renderMilestones();
  renderGanttChart();
  renderKPIs();
  renderPriorityActions();
  renderRisks();
  setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
  // Scenario toggle
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.currentScenario = e.target.dataset.scenario;
      renderMilestones();
      renderKPIs();
    });
  });

  // Compare button
  document.getElementById('compareBtn').addEventListener('click', () => {
    openComparisonModal();
  });

  // Close modal
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('comparisonModal').classList.remove('open');
  });

  // Close modal on overlay click
  document.getElementById('comparisonModal').addEventListener('click', (e) => {
    if (e.target.id === 'comparisonModal') {
      document.getElementById('comparisonModal').classList.remove('open');
    }
  });

  // Close task panel
  document.getElementById('closeTaskPanel').addEventListener('click', () => {
    document.getElementById('taskPanel').classList.remove('open');
  });

  // Risk section expand
  document.getElementById('riskHeader').addEventListener('click', () => {
    const content = document.getElementById('riskContent');
    const btn = document.getElementById('expandRiskBtn');
    content.classList.toggle('expanded');
    btn.classList.toggle('expanded');
  });
}

// Render Milestones
function renderMilestones() {
  const container = document.getElementById('milestonesTrack');
  const milestones = state.milestones[state.currentScenario];
  
  container.innerHTML = milestones.map(milestone => `
    <div class="milestone">
      <div class="milestone-marker">W${milestone.week}</div>
      <div class="milestone-label">${milestone.title}</div>
      <div class="milestone-tooltip">
        <strong>${milestone.title}</strong><br>
        Owner: ${milestone.owner}<br>
        ${milestone.acceptance}
      </div>
    </div>
  `).join('');
}

// Render Gantt Chart
function renderGanttChart() {
  const container = document.getElementById('ganttChart');
  const workstreams = ['discover', 'reporting', 'pilot', 'sip', 'enablement'];
  
  const html = workstreams.map(workstream => {
    const tasks = state.tasks.filter(t => t.workstream === workstream);
    
    return `
      <div class="workstream-group">
        <div class="workstream-header">${state.workstreamNames[workstream]}</div>
        ${tasks.map(task => {
          const barLeft = ((task.start_week - 1) / 12) * 100;
          const barWidth = ((task.end_week - task.start_week + 1) / 12) * 100;
          
          return `
            <div class="gantt-task" data-task-id="${task.id}">
              <div class="task-info">
                <div class="task-title">
                  ${task.title}
                  <span class="status-badge status-${task.status}">${formatStatus(task.status)}</span>
                </div>
                <div class="task-meta">Owner: ${task.owner} | W${task.start_week}-W${task.end_week}</div>
              </div>
              <div class="task-timeline">
                <div class="timeline-weeks">
                  ${Array(12).fill(0).map((_, i) => `<div class="week-cell"></div>`).join('')}
                </div>
                <div class="task-bar" style="left: ${barLeft}%; width: ${barWidth}%;">
                  ${task.progress}%
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
  
  // Add click handlers for tasks
  document.querySelectorAll('.gantt-task').forEach(taskEl => {
    taskEl.addEventListener('click', () => {
      const taskId = taskEl.dataset.taskId;
      const task = state.tasks.find(t => t.id === taskId);
      openTaskPanel(task);
    });
  });
}

// Render KPIs
function renderKPIs() {
  const container = document.getElementById('kpiCards');
  const kpis = state.kpis[state.currentScenario];
  
  const cards = [
    {
      title: 'Report Automation',
      value: `${kpis.reportAutomation.current}%`,
      label: `Target: ${kpis.reportAutomation.target}%`,
      progress: (kpis.reportAutomation.current / kpis.reportAutomation.target) * 100,
      trend: '+10%',
      trendDirection: 'up'
    },
    {
      title: 'Pilot Coverage',
      value: `${kpis.pilotCoverage.current}%`,
      label: `Target: ${kpis.pilotCoverage.target}%`,
      progress: (kpis.pilotCoverage.current / kpis.pilotCoverage.target) * 100,
      trend: 'Not Started',
      trendDirection: 'neutral'
    },
    {
      title: 'Time-to-Report',
      value: `${kpis.timeToReport.current}h`,
      label: `Target: ${kpis.timeToReport.target}h`,
      progress: 100 - ((kpis.timeToReport.current - kpis.timeToReport.target) / kpis.timeToReport.current * 100),
      trend: '-5h',
      trendDirection: 'up'
    },
    {
      title: 'SIP Readiness',
      value: `${kpis.sipReadiness.current}%`,
      label: `Target: ${kpis.sipReadiness.target}%`,
      progress: (kpis.sipReadiness.current / kpis.sipReadiness.target) * 100,
      trend: '+5%',
      trendDirection: 'up'
    }
  ];
  
  container.innerHTML = cards.map(card => `
    <div class="kpi-card">
      <div class="kpi-header">
        <div class="kpi-title">${card.title}</div>
        ${card.trendDirection !== 'neutral' ? `
          <div class="kpi-trend ${card.trendDirection}">
            ${card.trendDirection === 'up' ? '↑' : '↓'} ${card.trend}
          </div>
        ` : ''}
      </div>
      <div class="kpi-value">${card.value}</div>
      <div class="kpi-label">${card.label}</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${Math.max(0, Math.min(100, card.progress))}%"></div>
      </div>
      <div class="progress-label">${Math.round(card.progress)}% complete</div>
    </div>
  `).join('');
}

// Render Priority Actions
function renderPriorityActions() {
  const container = document.getElementById('priorityCards');
  const actions = [
    {
      title: 'Secure CRM Data Access',
      description: 'Critical path item. Need access to CRM database within Week 1 to avoid delays in reporting setup.'
    },
    {
      title: 'Finalize KPI Definitions',
      description: 'Alignment with stakeholders on what metrics matter most. Required for dashboard design.'
    },
    {
      title: 'Pilot Account Selection',
      description: 'Identify 35 target accounts with high potential scores for pilot program launch in Week 6.'
    },
    {
      title: 'SIP Analysis Kickoff',
      description: 'Begin review of current incentive structure to propose improvements by Week 8.'
    }
  ];
  
  container.innerHTML = actions.map(action => `
    <div class="priority-card">
      <div class="priority-title">${action.title}</div>
      <div class="priority-description">${action.description}</div>
    </div>
  `).join('');
}

// Render Risks
function renderRisks() {
  const container = document.getElementById('riskCards');
  
  container.innerHTML = state.risks.map(risk => `
    <div class="risk-card severity-${risk.severity}">
      <div class="risk-severity ${risk.severity}">${risk.severity}</div>
      <div class="risk-title">${risk.risk}</div>
      <div class="risk-mitigation"><strong>Mitigation:</strong> ${risk.mitigation}</div>
      <div class="risk-owner">Owner: ${risk.owner} | Status: ${risk.status}</div>
    </div>
  `).join('');
}

// Open Task Panel
function openTaskPanel(task) {
  const panel = document.getElementById('taskPanel');
  const content = document.getElementById('taskPanelContent');
  const title = document.getElementById('taskPanelTitle');
  
  title.textContent = task.title;
  
  content.innerHTML = `
    <div class="detail-section">
      <div class="detail-label">What</div>
      <div class="detail-content">${task.what}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Why</div>
      <div class="detail-content">${task.why}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">So What</div>
      <div class="detail-content">${task.so_what}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Deliverables</div>
      <div class="detail-content">${task.deliverables}</div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Acceptance Criteria</div>
      <div class="detail-content">${task.acceptance}</div>
    </div>
    
    ${task.risks && task.risks.length > 0 ? `
      <div class="detail-section">
        <div class="detail-label">Risks</div>
        <ul class="detail-list">
          ${task.risks.map(r => `
            <li>
              <strong>${r.text}</strong> (${r.severity})<br>
              Mitigation: ${r.mitigation}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}
    
    ${task.action_mariana ? `
      <div class="detail-section">
        <div class="detail-label">Action Items</div>
        <div class="detail-content">${task.action_mariana}</div>
      </div>
    ` : ''}
    
    <div class="detail-section">
      <div class="detail-label">Progress Simulation</div>
      <div class="progress-slider-container">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value="${task.progress}" 
          class="progress-slider"
          id="progressSlider"
        />
        <div class="progress-value" id="progressValue">${task.progress}%</div>
      </div>
    </div>
    
    <div class="detail-section">
      <div class="detail-label">Task Details</div>
      <div class="detail-content">
        <strong>Owner:</strong> ${task.owner}<br>
        <strong>Timeline:</strong> Week ${task.start_week} - Week ${task.end_week}<br>
        <strong>Status:</strong> ${formatStatus(task.status)}<br>
        <strong>Workstream:</strong> ${state.workstreamNames[task.workstream]}
      </div>
    </div>
  `;
  
  // Add progress slider listener
  setTimeout(() => {
    const slider = document.getElementById('progressSlider');
    const valueDisplay = document.getElementById('progressValue');
    
    if (slider) {
      slider.addEventListener('input', (e) => {
        const newProgress = parseInt(e.target.value);
        valueDisplay.textContent = `${newProgress}%`;
        
        // Update task progress in state
        task.progress = newProgress;
        
        // Update task status based on progress
        if (newProgress === 0) {
          task.status = 'not_started';
        } else if (newProgress === 100) {
          task.status = 'completed';
        } else {
          task.status = 'in_progress';
        }
        
        // Re-render gantt chart and KPIs
        renderGanttChart();
        renderKPIs();
      });
    }
  }, 100);
  
  panel.classList.add('open');
}

// Open Comparison Modal
function openComparisonModal() {
  const modal = document.getElementById('comparisonModal');
  const content = document.getElementById('comparisonContent');
  
  const sfeKpis = state.kpis.sfe_lead;
  const biKpis = state.kpis.bi_manager;
  
  content.innerHTML = `
    <div class="comparison-grid">
      <div class="comparison-column">
        <h3>SFE Lead Scenario</h3>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Report Automation</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${sfeKpis.reportAutomation.current}%</span>
            <span class="comparison-target">→ ${sfeKpis.reportAutomation.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Pilot Coverage</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${sfeKpis.pilotCoverage.current}%</span>
            <span class="comparison-target">→ ${sfeKpis.pilotCoverage.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Time-to-Report</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${sfeKpis.timeToReport.current}h</span>
            <span class="comparison-target">→ ${sfeKpis.timeToReport.target}h</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">SIP Readiness</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${sfeKpis.sipReadiness.current}%</span>
            <span class="comparison-target">→ ${sfeKpis.sipReadiness.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Focus Areas</div>
          <div class="detail-content" style="margin-top: 8px;">
            • Field operations optimization<br>
            • Pilot program execution<br>
            • Stakeholder enablement<br>
            • SIP mechanics improvement
          </div>
        </div>
      </div>
      
      <div class="comparison-column">
        <h3>BI Manager Scenario</h3>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Report Automation</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${biKpis.reportAutomation.current}%</span>
            <span class="comparison-target">→ ${biKpis.reportAutomation.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Pilot Coverage</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${biKpis.pilotCoverage.current}%</span>
            <span class="comparison-target">→ ${biKpis.pilotCoverage.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Time-to-Report</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${biKpis.timeToReport.current}h</span>
            <span class="comparison-target">→ ${biKpis.timeToReport.target}h</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">SIP Readiness</div>
          <div class="comparison-kpi-values">
            <span class="comparison-value">${biKpis.sipReadiness.current}%</span>
            <span class="comparison-target">→ ${biKpis.sipReadiness.target}%</span>
          </div>
        </div>
        
        <div class="comparison-kpi">
          <div class="comparison-kpi-title">Focus Areas</div>
          <div class="detail-content" style="margin-top: 8px;">
            • Data architecture & ETL<br>
            • Advanced analytics platform<br>
            • Self-service BI tools<br>
            • Enterprise data governance
          </div>
        </div>
      </div>
    </div>
    
    <div style="margin-top: 32px; padding: 20px; background: rgba(184, 115, 51, 0.05); border-radius: 8px;">
      <h4 style="color: var(--copper); margin-bottom: 12px;">Key Differences</h4>
      <div class="detail-content">
        <strong>SFE Lead:</strong> Focuses on operational excellence, pilot execution, and field enablement with moderate technical depth.<br><br>
        <strong>BI Manager:</strong> Emphasizes technical infrastructure, advanced analytics capabilities, and enterprise-wide data platform with deeper technical requirements.
      </div>
    </div>
  `;
  
  modal.classList.add('open');
}

// Utility Functions
function formatStatus(status) {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);