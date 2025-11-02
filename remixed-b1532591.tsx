import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Target } from 'lucide-react';

// Theme colors from Sample Aesthetics
const theme = {
  copper: '#B87333',
  dark: '#212121',
  lightCopper: '#DABFAA',
  darkCopper: '#8B5A2B',
  cream: '#F5EFE6',
  good: '#52854C',
  bad: '#C9302C',
};

// Complete plan data
const planData = {
  sfe_lead: {
    kpis: {
      pilotSize: 35,
      incrementalRev: 148260,
      avgPotentialScore: 0.29,
      reportAutomation: { current: 30, target: 100 },
      pilotCoverage: { current: 0, target: 100 },
      timeToReport: { current: 48, target: 24 },
      sipReadiness: { current: 20, target: 80 }
    },
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
        title: 'Data flow map & KPI glossary',
        owner: 'Roman',
        start_week: 1,
        end_week: 2,
        status: 'in_progress',
        progress: 60,
        what: 'Document data sources, lineage, and KPI calculation logic',
        why: 'Create single source of truth for metrics',
        so_what: 'Zero ambiguity on what we measure and why',
        acceptance: 'Signed-off KPI doc by AM + Finance',
        deliverables: 'Data flow diagram + KPI SQL logic',
        risks: [
          { text: 'Stakeholder misalignment on definitions', severity: 'medium', mitigation: 'Short workshops to align' }
        ],
        action_mariana: 'Review and sign-off on KPI doc'
      },
      {
        id: 'reporting.t1',
        workstream: 'reporting',
        title: 'Coverage & Frequency report (Power BI)',
        owner: 'Roman',
        start_week: 3,
        end_week: 4,
        status: 'not_started',
        progress: 0,
        what: 'Automate coverage/frequency by rep/territory',
        why: 'Replace manual weekly Excel reports',
        so_what: 'AMs get real-time insights, save 8h/week',
        acceptance: 'AM accepts report as one-pager replacement',
        deliverables: 'Power BI report & SQL views',
        risks: [
          { text: 'Data quality issues', severity: 'medium', mitigation: 'Data profiling sprint in Week 2' }
        ],
        action_mariana: 'Validate report replaces current manual process'
      },
      {
        id: 'reporting.t2',
        workstream: 'reporting',
        title: 'Field Performance one-pager automation',
        owner: 'Roman',
        start_week: 3,
        end_week: 4,
        status: 'not_started',
        progress: 0,
        what: 'Automated weekly field performance digest',
        why: 'Consistent format, auto-refresh, no manual work',
        so_what: 'Leadership gets consistent weekly view',
        acceptance: 'Leadership uses automated version for 2 consecutive weeks',
        deliverables: 'Power BI one-pager with scheduled refresh',
        risks: [],
        action_mariana: 'Share current one-pager template for automation'
      },
      {
        id: 'pilot.t1',
        workstream: 'pilot',
        title: 'Pilot design: select 35 Benelux clinics',
        owner: 'Roman + AMs',
        start_week: 5,
        end_week: 6,
        status: 'not_started',
        progress: 0,
        what: 'Freeze pilot participants, rep assignments, objectives',
        why: 'Focus rep effort where return is highest',
        so_what: 'Expected +€148K annual incremental revenue',
        acceptance: 'Field Ops signs off pilot playbook',
        deliverables: 'Pilot playbook & monitoring spec',
        risks: [
          { text: 'Field adoption resistance', severity: 'medium', mitigation: 'Pre-pilot training & incentive transparency' }
        ],
        action_mariana: 'Confirm clinic list with 2 AMs this week'
      },
      {
        id: 'pilot.t2',
        workstream: 'pilot',
        title: 'Pilot monitoring dashboard & scheduled digest',
        owner: 'Roman',
        start_week: 5,
        end_week: 8,
        status: 'not_started',
        progress: 0,
        what: 'Real-time pilot tracking: visits, coverage, outcomes',
        why: 'Early signal detection, course correction',
        so_what: 'Week-6 interim check prevents wasted effort',
        acceptance: 'Dashboard shows all pilot KPIs updated daily',
        deliverables: 'Power BI dashboard + weekly digest email',
        risks: [
          { text: 'CRM logging gaps', severity: 'high', mitigation: 'Manual audit + rep coaching' }
        ],
        action_mariana: 'Review dashboard spec and approve KPIs'
      },
      {
        id: 'sip.t1',
        workstream: 'sip',
        title: 'SIP simulation (baseline + 2 variants)',
        owner: 'Roman + Finance',
        start_week: 5,
        end_week: 8,
        status: 'not_started',
        progress: 0,
        what: 'Model current SIP + 2 alternatives with Gini metrics',
        why: 'Assess fairness, cost, behavioral impact',
        so_what: 'Data-backed recommendation for 2026 plan',
        acceptance: 'Finance approves simulation methodology',
        deliverables: 'Payout simulation workbook with Gini metrics',
        risks: [
          { text: 'Incomplete historical data', severity: 'medium', mitigation: 'Use 18-month lookback, flag gaps' }
        ],
        action_mariana: 'Schedule 60-min review with Comp team'
      },
      {
        id: 'enablement.t1',
        workstream: 'enablement',
        title: 'Weekly SFE stand-up & one-pager',
        owner: 'Roman',
        start_week: 9,
        end_week: 12,
        status: 'not_started',
        progress: 0,
        what: 'Weekly sync: pilot status, blockers, wins',
        why: 'Keep stakeholders aligned, unblock issues fast',
        so_what: 'No surprises, transparent progress',
        acceptance: 'Standup runs 4 consecutive weeks',
        deliverables: 'Weekly notes + 1-pager insight',
        risks: [],
        action_mariana: 'Add to calendar, invite key stakeholders'
      },
      {
        id: 'pilot.t3',
        workstream: 'pilot',
        title: 'Pilot execution & interim analysis',
        owner: 'Roman',
        start_week: 9,
        end_week: 12,
        status: 'not_started',
        progress: 0,
        what: 'Run pilot, weekly monitoring; week-6 interim signal check',
        why: 'Validate hypothesis before full rollout',
        so_what: 'Go/No-Go decision backed by data',
        acceptance: 'Mid-pilot memo & decision trigger documented',
        deliverables: 'Interim analysis + final pilot report',
        risks: [
          { text: 'False positive pilot signal', severity: 'medium', mitigation: 'Matched controls, pre-specified thresholds' }
        ],
        action_mariana: 'Define Go/No-Go criteria with leadership'
      }
    ],
    milestones: [
      { week: 1, title: 'KPI glossary sign-off', owner: 'Roman', acceptance: 'Email confirmation' },
      { week: 4, title: 'Automated reports deployed', owner: 'Roman', acceptance: 'AM uses one-pager' },
      { week: 6, title: 'Pilot kickoff', owner: 'Roman + AMs', acceptance: 'Pilot playbook signed' },
      { week: 9, title: 'Mid-pilot interim analysis', owner: 'Roman', acceptance: 'Interim memo delivered' },
      { week: 12, title: 'Pilot wrap-up & scale decision', owner: 'Roman', acceptance: 'Go/No-Go decision documented' }
    ]
  },
  bi_manager: {
    kpis: {
      pilotSize: 35,
      incrementalRev: 148260,
      avgPotentialScore: 0.29,
      reportAutomation: { current: 20, target: 100 },
      pilotCoverage: { current: 0, target: 100 },
      timeToReport: { current: 48, target: 12 },
      sipReadiness: { current: 15, target: 90 }
    },
    tasks: [
      {
        id: 'discover.b1',
        workstream: 'discover',
        title: 'BI charter & stakeholder workshop',
        owner: 'Roman',
        start_week: 1,
        end_week: 2,
        status: 'in_progress',
        progress: 50,
        what: 'Define BI mission, governance & priorities',
        why: 'Set foundation for centralized BI function',
        so_what: 'Clear mandate, decision rights, SLA',
        acceptance: 'Leadership signs-off BI charter',
        deliverables: 'BI charter document + governance framework',
        risks: [
          { text: 'Competing stakeholder priorities', severity: 'high', mitigation: 'Executive sponsor + prioritization framework' }
        ],
        action_mariana: 'Sign-off on BI charter and governance model'
      },
      {
        id: 'reporting.b1',
        workstream: 'reporting',
        title: 'Design shared Power BI dataset (semantic layer)',
        owner: 'Roman + IT',
        start_week: 3,
        end_week: 6,
        status: 'not_started',
        progress: 0,
        what: 'Build reusable semantic layer for all reports',
        why: 'Single source of truth, faster report development',
        so_what: 'Report build time drops 70%, zero metric disputes',
        acceptance: 'Finance & AMs approve measure outputs',
        deliverables: 'Shared dataset + documented measures',
        risks: [
          { text: 'IT resource constraints', severity: 'high', mitigation: 'Escalate to CTO, define MVP scope' }
        ],
        action_mariana: 'Secure IT resources, escalate if needed'
      },
      {
        id: 'pilot.b1',
        workstream: 'pilot',
        title: 'Territory optimization prototype & pilot list',
        owner: 'Roman',
        start_week: 7,
        end_week: 10,
        status: 'not_started',
        progress: 0,
        what: 'Model optimal territory design + pilot clinics',
        why: 'Balance workload, maximize coverage ROI',
        so_what: 'Data-driven territory realignment proposal',
        acceptance: 'Field Ops accepts methodology',
        deliverables: 'Territory model + pilot clinic list',
        risks: [
          { text: 'Political resistance to territory changes', severity: 'high', mitigation: 'Phased approach, involve reps early' }
        ],
        action_mariana: 'Pre-brief Field Ops leadership on approach'
      },
      {
        id: 'sip.b1',
        workstream: 'sip',
        title: 'SIP simulator (interactive prototype)',
        owner: 'Roman + Finance',
        start_week: 7,
        end_week: 10,
        status: 'not_started',
        progress: 0,
        what: 'Build interactive SIP modeling tool',
        why: 'Enable Finance to test scenarios independently',
        so_what: '2026 SIP design in weeks, not months',
        acceptance: 'Finance uses tool for 2026 planning',
        deliverables: 'Interactive SIP calculator + documentation',
        risks: [
          { text: 'Complexity of comp logic', severity: 'medium', mitigation: 'Start with simplified model, iterate' }
        ],
        action_mariana: 'Align Finance on tool scope and timeline'
      },
      {
        id: 'enablement.b1',
        workstream: 'enablement',
        title: 'Training, rollout plan & SLA',
        owner: 'Roman',
        start_week: 11,
        end_week: 12,
        status: 'not_started',
        progress: 0,
        what: 'BI training program + service catalog',
        why: 'Scale BI adoption, set clear expectations',
        so_what: 'Stakeholders know what to ask for and when',
        acceptance: 'Training delivered to 3 stakeholder groups',
        deliverables: 'Training materials + BI service SLA',
        risks: [],
        action_mariana: 'Approve training schedule and SLA draft'
      }
    ],
    milestones: [
      { week: 2, title: 'BI charter signed', owner: 'Roman', acceptance: 'Leadership sign-off' },
      { week: 6, title: 'Semantic layer deployed', owner: 'Roman + IT', acceptance: 'First report using shared dataset' },
      { week: 10, title: 'Territory model validated', owner: 'Roman', acceptance: 'Field Ops approval' },
      { week: 10, title: 'SIP simulator delivered', owner: 'Roman + Finance', acceptance: 'Finance uses tool' },
      { week: 12, title: 'BI training rollout complete', owner: 'Roman', acceptance: 'Training attendance >80%' }
    ]
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
      risk: 'Field adoption resistance',
      severity: 'medium',
      mitigation: 'Pre-pilot training & incentive transparency',
      owner: 'AMs',
      status: 'open'
    },
    {
      risk: 'False positive pilot signal',
      severity: 'medium',
      mitigation: 'Matched controls, pre-specified thresholds',
      owner: 'Roman + Biostat',
      status: 'open'
    }
  ]
};

const workstreamLabels = {
  discover: 'Data & Access',
  reporting: 'Reporting & Automation',
  pilot: 'Pilot Design & Execution',
  sip: 'SIP & Incentives',
  enablement: 'Stakeholder Enablement'
};

const workstreamColors = {
  discover: theme.copper,
  reporting: theme.darkCopper,
  pilot: theme.lightCopper,
  sip: theme.dark,
  enablement: theme.cream
};

function App() {
  const [scenario, setScenario] = useState('sfe_lead');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showRisks, setShowRisks] = useState(false);
  const [localKpis, setLocalKpis] = useState(null);
  const [localProgress, setLocalProgress] = useState({});

  const currentData = planData[scenario];
  const displayKpis = localKpis || currentData.kpis;

  const updateProgress = (taskId, newProgress) => {
    setLocalProgress({ ...localProgress, [taskId]: newProgress });
    
    // Simulate KPI updates
    const completedTasks = Object.values(localProgress).filter(p => p === 100).length;
    const totalTasks = currentData.tasks.length;
    const completionRate = (completedTasks / totalTasks) * 100;
    
    setLocalKpis({
      ...displayKpis,
      reportAutomation: { 
        current: Math.min(100, displayKpis.reportAutomation.current + (newProgress === 100 ? 10 : 0)),
        target: 100 
      },
      sipReadiness: {
        current: Math.min(90, displayKpis.sipReadiness.current + (newProgress === 100 ? 8 : 0)),
        target: displayKpis.sipReadiness.target
      }
    });
  };

  const getTaskProgress = (taskId) => {
    return localProgress[taskId] ?? currentData.tasks.find(t => t.id === taskId)?.progress ?? 0;
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: theme.dark, fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${theme.copper} 0%, ${theme.darkCopper} 100%)`, padding: '2rem', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            90-Day Plan — SFE Lead ↔ BI Manager
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '1.5rem' }}>
            Actionable plan to stabilize SFE operations, run a Benelux pilot, and build a BI foundation — staged path from SFE Lead to BI Manager.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '4px' }}>
              <button
                onClick={() => { setScenario('sfe_lead'); setLocalKpis(null); setLocalProgress({}); }}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: scenario === 'sfe_lead' ? '#FFFFFF' : 'transparent',
                  color: scenario === 'sfe_lead' ? theme.copper : '#FFFFFF',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                SFE Lead
              </button>
              <button
                onClick={() => { setScenario('bi_manager'); setLocalKpis(null); setLocalProgress({}); }}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: scenario === 'bi_manager' ? '#FFFFFF' : 'transparent',
                  color: scenario === 'bi_manager' ? theme.copper : '#FFFFFF',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                BI Manager
              </button>
            </div>

            <div style={{ flex: '1' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Roman Lakovskiy</div>
              <a href="https://www.linkedin.com/in/roman-lakovskiy/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#FFFFFF', textDecoration: 'none', opacity: 0.95 }}>
                linkedin.com/in/roman-lakovskiy
              </a>
              <div style={{ fontSize: '0.9rem', opacity: 0.95 }}>Tél: 06-15-14-93-95</div>
              <a href="mailto:lakovskiy@outlook.fr" style={{ fontSize: '0.9rem', color: '#FFFFFF', textDecoration: 'none', opacity: 0.95 }}>
                lakovskiy@outlook.fr
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Ribbon */}
      <div style={{ background: theme.cream, padding: '1rem 0', borderBottom: `2px solid ${theme.lightCopper}` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            {currentData.milestones.map((m, idx) => (
              <div key={idx} style={{ position: 'relative', textAlign: 'center', flex: '1' }}>
                <div
                  title={`${m.title}\nOwner: ${m.owner}\nAcceptance: ${m.acceptance}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: theme.copper,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    margin: '0 auto 0.5rem',
                    cursor: 'pointer',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  W{m.week}
                </div>
                <div style={{ fontSize: '0.75rem', color: theme.dark, fontWeight: '500' }}>
                  {m.title}
                </div>
              </div>
            ))}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '5%',
              right: '5%',
              height: '2px',
              background: theme.lightCopper,
              zIndex: 0
            }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Timeline / Gantt */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: `2px solid ${theme.lightCopper}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: theme.dark }}>Timeline</h2>
              <button
                onClick={() => setShowComparison(!showComparison)}
                style={{
                  padding: '0.5rem 1rem',
                  background: theme.cream,
                  border: `1px solid ${theme.copper}`,
                  borderRadius: '6px',
                  color: theme.copper,
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {showComparison ? 'Hide' : 'Compare Scenarios'}
              </button>
            </div>

            {/* Week scale */}
            <div style={{ display: 'flex', marginBottom: '1rem', paddingLeft: '180px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(w => (
                <div key={w} style={{ flex: '1', textAlign: 'center', fontSize: '0.75rem', color: theme.dark, fontWeight: '500' }}>
                  W{w}
                </div>
              ))}
            </div>

            {/* Gantt chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.keys(workstreamLabels).map(ws => {
                const tasks = currentData.tasks.filter(t => t.workstream === ws);
                if (tasks.length === 0) return null;

                return (
                  <div key={ws}>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: '600', 
                      color: theme.dark, 
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {workstreamLabels[ws]}
                    </div>
                    {tasks.map(task => {
                      const progress = getTaskProgress(task.id);
                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                          title={`${task.what}\n${task.why}\n${task.so_what}`}
                        >
                          <div style={{ width: '180px', fontSize: '0.8rem', color: theme.dark, paddingRight: '1rem' }}>
                            {task.title}
                          </div>
                          <div style={{ flex: '1', position: 'relative', height: '32px', display: 'flex' }}>
                            <div style={{
                              position: 'absolute',
                              left: `${((task.start_week - 1) / 12) * 100}%`,
                              width: `${((task.end_week - task.start_week + 1) / 12) * 100}%`,
                              height: '100%',
                              background: workstreamColors[ws],
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0 0.5rem',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${progress}%`,
                                background: 'rgba(255,255,255,0.3)',
                                transition: 'width 0.3s ease'
                              }} />
                              <span style={{ 
                                fontSize: '0.7rem', 
                                color: ws === 'enablement' ? theme.dark : '#FFFFFF', 
                                fontWeight: '500',
                                position: 'relative',
                                zIndex: 1
                              }}>
                                {task.owner} · {progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <KPICard
              title="Report Automation"
              current={displayKpis.reportAutomation.current}
              target={displayKpis.reportAutomation.target}
              unit="%"
              trend={[20, 25, 30, 32, 35, 40]}
            />
            <KPICard
              title="Pilot Coverage"
              current={displayKpis.pilotCoverage.current}
              target={displayKpis.pilotCoverage.target}
              unit="%"
              trend={[0, 0, 0, 0, 0, 0]}
            />
            <KPICard
              title="Time-to-Report"
              current={displayKpis.timeToReport.current}
              target={displayKpis.timeToReport.target}
              unit="h"
              inverse={true}
              trend={[48, 46, 44, 42, 40, 38]}
            />
            <KPICard
              title="SIP Readiness"
              current={displayKpis.sipReadiness.current}
              target={displayKpis.sipReadiness.target}
              unit="%"
              trend={[10, 12, 15, 18, 20, 22]}
            />
          </div>
        </div>

        {/* Risks & Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Risks */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: `2px solid ${theme.lightCopper}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.dark }}>Risks & Mitigations</h2>
              <button
                onClick={() => setShowRisks(!showRisks)}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: 'transparent',
                  border: 'none',
                  color: theme.copper,
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {showRisks ? '▼' : '▶'}
              </button>
            </div>

            {showRisks && (
              <div style={{ fontSize: '0.85rem' }}>
                {planData.risks.map((r, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '1rem', 
                    padding: '1rem', 
                    background: theme.cream, 
                    borderRadius: '8px',
                    borderLeft: `4px solid ${r.severity === 'high' ? theme.bad : theme.lightCopper}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', color: theme.dark }}>{r.risk}</span>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: r.severity === 'high' ? theme.bad : theme.lightCopper,
                        color: '#FFFFFF'
                      }}>
                        {r.severity.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ color: theme.dark, marginBottom: '0.25rem' }}>
                      <strong>Mitigation:</strong> {r.mitigation}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7 }}>
                      Owner: {r.owner} · Status: {r.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Narrative / Actions */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: `2px solid ${theme.lightCopper}`, padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: theme.dark, marginBottom: '1rem' }}>Priority Actions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentData.tasks.slice(0, 4).map(task => (
                <div key={task.id} style={{
                  padding: '1rem',
                  background: theme.cream,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${theme.copper}`
                }}>
                  <div style={{ fontWeight: '600', color: theme.dark, marginBottom: '0.5rem' }}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: theme.dark, marginBottom: '0.5rem' }}>
                    <strong>Why:</strong> {task.why}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: theme.dark, marginBottom: '0.5rem' }}>
                    <strong>So what:</strong> {task.so_what}
                  </div>
                  {task.action_mariana && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: theme.copper,
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      → {task.action_mariana}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <div
          onClick={() => setSelectedTask(null)}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '500px',
              background: '#FFFFFF',
              padding: '2rem',
              overflowY: 'auto',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: theme.dark, flex: 1 }}>
                {selectedTask.title}
              </h2>
              <button
                onClick={() => setSelectedTask(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: theme.dark,
                  padding: '0',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7, marginBottom: '0.25rem' }}>Owner</div>
                  <div style={{ fontWeight: '600', color: theme.dark }}>{selectedTask.owner}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7, marginBottom: '0.25rem' }}>Timeline</div>
                  <div style={{ fontWeight: '600', color: theme.dark }}>Week {selectedTask.start_week}-{selectedTask.end_week}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7, marginBottom: '0.25rem' }}>Status</div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: selectedTask.status === 'in_progress' ? theme.copper : theme.lightCopper,
                    color: '#FFFFFF'
                  }}>
                    {selectedTask.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7, marginBottom: '0.25rem' }}>Progress</div>
                  <div style={{ fontWeight: '600', color: theme.dark }}>{getTaskProgress(selectedTask.id)}%</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={getTaskProgress(selectedTask.id)}
                  onChange={(e) => updateProgress(selectedTask.id, parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '0.75rem', color: theme.dark, opacity: 0.7, textAlign: 'center', marginTop: '0.25rem' }}>
                  Simulate progress (demo only)
                </div>
              </div>
            </div>

            <Section title="What" content={selectedTask.what} />
            <Section title="Why" content={selectedTask.why} />
            <Section title="So What" content={selectedTask.so_what} />
            <Section title="Deliverables" content={selectedTask.deliverables} />
            <Section title="Acceptance Criteria" content={selectedTask.acceptance} />

            {selectedTask.risks && selectedTask.risks.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: theme.dark, marginBottom: '0.75rem' }}>Risks</h3>
                {selectedTask.risks.map((risk, idx) => (
                  <div key={idx} style={{
                    padding: '1rem',
                    background: theme.cream,
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    borderLeft: `4px solid ${risk.severity === 'high' ? theme.bad : theme.lightCopper}`
                  }}>
                    <div style={{ fontWeight: '600', color: theme.dark, marginBottom: '0.25rem' }}>
                      {risk.text} <span style={{ fontSize: '0.75rem', color: theme.bad }}>({risk.severity})</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: theme.dark }}>
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTask.action_mariana && (
              <div style={{
                padding: '1rem',
                background: theme.copper,
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: '600'
              }}>
                <div style={{ fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.9 }}>IMMEDIATE ACTION FOR MARIANA</div>
                <div>{selectedTask.action_mariana}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Overlay */}
      {showComparison && (
        <div
          onClick={() => setShowComparison(false)}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: theme.dark }}>Scenario Comparison</h2>
              <button
                onClick={() => setShowComparison(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: theme.dark
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: theme.copper, 
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: `2px solid ${theme.copper}`
                }}>
                  SFE Lead
                </h3>
                <div style={{ fontSize: '0.9rem', color: theme.dark }}>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Focus:</strong> Operational excellence, immediate impact
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Key deliverables:</strong> Automated reports, pilot execution, SIP simulation
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Timeline emphasis:</strong> Quick wins in reporting (W3-4), pilot design & execution
                  </p>
                  <p>
                    <strong>Best for:</strong> Proving immediate value, building stakeholder trust through delivery
                  </p>
                </div>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: theme.darkCopper, 
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: `2px solid ${theme.darkCopper}`
                }}>
                  BI Manager
                </h3>
                <div style={{ fontSize: '0.9rem', color: theme.dark }}>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Focus:</strong> Platform building, scalable infrastructure
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Key deliverables:</strong> BI charter, semantic layer, territory optimization, SIP simulator
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    <strong>Timeline emphasis:</strong> Foundation first (W1-6), then strategic tools
                  </p>
                  <p>
                    <strong>Best for:</strong> Long-term scalability, establishing BI as strategic function
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: theme.cream, 
              borderRadius: '8px',
              borderLeft: `4px solid ${theme.copper}`
            }}>
              <h4 style={{ fontWeight: '600', color: theme.dark, marginBottom: '0.75rem' }}>Key Differences</h4>
              <ul style={{ fontSize: '0.9rem', color: theme.dark, paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  SFE Lead prioritizes operational reports and pilot setup in Weeks 3-6
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  BI Manager invests in semantic layer (W3-6) for long-term efficiency
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  SFE Lead: faster time-to-value, tactical wins
                </li>
                <li>
                  BI Manager: strategic positioning, scalable architecture
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ title, current, target, unit, inverse = false, trend = [] }) {
  const delta = current - target;
  const isGood = inverse ? delta < 0 : delta > 0;
  const percentOfTarget = (current / target) * 100;

  return (
    <div style={{
      background: theme.cream,
      border: `2px solid ${theme.copper}`,
      borderRadius: '12px',
      padding: '1.25rem'
    }}>
      <div style={{ fontSize: '0.85rem', color: theme.dark, marginBottom: '0.5rem', fontWeight: '500' }}>
        {title}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: '600', color: theme.copper }}>
          {current}{unit}
        </div>
        <div style={{ fontSize: '1rem', color: theme.dark, marginLeft: '0.5rem', opacity: 0.7 }}>
          / {target}{unit}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {isGood ? (
          <TrendingUp size={16} color={theme.good} />
        ) : (
          <TrendingDown size={16} color={theme.bad} />
        )}
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: isGood ? theme.good : theme.bad }}>
          {inverse ? Math.abs(delta) : delta}{unit} {isGood ? 'better' : 'behind'}
        </span>
      </div>
      <Sparkline data={trend} color={theme.copper} />
      <div style={{
        marginTop: '0.75rem',
        height: '6px',
        background: theme.lightCopper,
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(100, percentOfTarget)}%`,
          background: theme.copper,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
}

function Sparkline({ data, color }) {
  if (data.length < 2) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="30" style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        style={{ transform: 'scale(1, 1)' }}
      />
    </svg>
  );
}

function Section({ title, content }) {
  if (!content) return null;
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: theme.dark, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <div style={{ fontSize: '0.9rem', color: theme.dark, lineHeight: '1.6' }}>
        {content}
      </div>
    </div>
  );
}

export default App;