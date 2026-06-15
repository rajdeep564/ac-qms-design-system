(function () {
  'use strict';

  var STATE_KEY = 'ac-qms-demo-state';
  var STATE_VERSION = 5;

  var AWS_TEST_KEYS = ['desc', 'sol', 'idA', 'idB', 'appr', 'ph', 'chl', 'hm', 'sa', 'lod', 'assay'];
  var AWS_TEST_LABELS = {
    desc: 'Description', sol: 'Solubility', idA: 'Identification A — By IR',
    idB: 'Identification B — By chemical reaction', appr: 'Appearance of solution',
    ph: 'pH', chl: 'Chlorides', hm: 'Heavy metals', sa: 'Sulphated ash',
    lod: 'Loss on drying', assay: 'Assay on dried basis'
  };
  var DEFAULT_BATCH = 'GCN/010526';
  var DEFAULT_DOC = 'SPEC/FG00038/01';

  var TEST_GROUP_ORDER = [
    'VISUAL_INSPECTION', 'TESTING_PARAMETERS', 'ADDITIONAL_TESTS',
    'ELEMENTAL_IMPURITIES', 'MICROBIOLOGICAL'
  ];
  var TEST_GROUP_LABELS = {
    VISUAL_INSPECTION: 'VISUAL INSPECTION PARAMETERS',
    TESTING_PARAMETERS: 'TESTING PARAMETERS',
    ADDITIONAL_TESTS: 'ADDITIONAL TESTS',
    ELEMENTAL_IMPURITIES: 'ELEMENTAL IMPURITIES',
    MICROBIOLOGICAL: 'MICROBIOLOGICAL TESTS'
  };

  function buildGlycineTestParameters() {
    function tp(name, group, type, opts) {
      opts = opts || {};
      return {
        name: name, group: group, type: type,
        pharmacopoeiaTag: opts.pharmacopoeiaTag || 'IP',
        acceptanceCriteria: opts.acceptanceCriteria || '',
        operator: opts.operator || null,
        min: opts.min != null ? opts.min : null,
        max: opts.max != null ? opts.max : null,
        unit: opts.unit || null,
        isMandatory: opts.isMandatory !== false,
        isOutsideLab: !!opts.isOutsideLab
      };
    }
    var T = 'TESTING_PARAMETERS';
    var V = 'VISUAL_INSPECTION';
    var A = 'ADDITIONAL_TESTS';
    var E = 'ELEMENTAL_IMPURITIES';
    var M = 'MICROBIOLOGICAL';
    return [
      tp('Description', V, 'Qualitative', { acceptanceCriteria: 'A white, crystalline powder.' }),
      tp('Solubility', T, 'Qualitative', { acceptanceCriteria: 'Freely soluble in water; very slightly soluble in ethanol (95%); practically insoluble in ether.' }),
      tp('Identification A — By IR', T, 'Qualitative', { acceptanceCriteria: 'IR spectrum of Glycine sample should be concordant with IR spectrum of Glycine working standard.' }),
      tp('Identification B — By chemical test', T, 'Qualitative', { acceptanceCriteria: 'The resulting solution is violet with a greenish yellow fluorescence. After a few minutes the solution becomes orange and then yellow and the intense fluorescence remains.' }),
      tp('Appearance of solution', T, 'Qualitative', { acceptanceCriteria: 'A 10.0% w/v solution in carbon dioxide-free water is clear & not more intensely colored than reference solution YS7.' }),
      tp('pH', T, 'Quantitative', { acceptanceCriteria: '5.9 – 6.3', operator: 'BETWEEN', min: 5.9, max: 6.3 }),
      tp('Chlorides', T, 'Quantitative', { acceptanceCriteria: 'NMT 100 ppm', operator: 'NMT', max: 100, unit: 'ppm', pharmacopoeiaTag: 'IP / BP / USP' }),
      tp('Heavy metals', T, 'Quantitative', { acceptanceCriteria: 'NMT 10 ppm', operator: 'NMT', max: 10, unit: 'ppm', isOutsideLab: true }),
      tp('Sulphated ash', T, 'Quantitative', { acceptanceCriteria: 'NMT 0.1 %', operator: 'NMT', max: 0.1, unit: '%' }),
      tp('Loss on drying', T, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 %', operator: 'NMT', max: 0.5, unit: '%' }),
      tp('Assay (on dried basis)', T, 'Quantitative', { acceptanceCriteria: '98.5 – 101.5 %', operator: 'BETWEEN', min: 98.5, max: 101.5, unit: '%' }),
      tp('Foreign matter', T, 'Qualitative', { acceptanceCriteria: 'Should be absent in 5 gm sample' }),
      tp('Ethylene oxide', T, 'Quantitative', { acceptanceCriteria: 'NMT 0.1 ppm', operator: 'NMT', max: 0.1, unit: 'ppm', isOutsideLab: true }),
      tp('OVI / Residual solvent (Methanol)', T, 'Quantitative', { acceptanceCriteria: 'NMT 3000 ppm', operator: 'NMT', max: 3000, unit: 'ppm', isOutsideLab: true }),
      tp('Sieve analysis', A, 'Qualitative', { acceptanceCriteria: 'As per customer requirement', isMandatory: false }),
      tp('Bulk Density', A, 'Quantitative', { acceptanceCriteria: 'As per customer requirement', isMandatory: false }),
      tp('Lead (Pb)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Arsenic (As)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Mercury (Hg)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.1 µg/g', operator: 'NMT', max: 0.1, unit: 'µg/g', isOutsideLab: true }),
      tp('Cadmium (Cd)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Cobalt (Co)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Vanadium (V)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Nickel (Ni)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Lithium (Li)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Antimony (Sb)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Copper (Cu)', E, 'Quantitative', { acceptanceCriteria: 'NMT 0.5 µg/g', operator: 'NMT', max: 0.5, unit: 'µg/g', isOutsideLab: true }),
      tp('Bacterial endotoxin test', M, 'Quantitative', { acceptanceCriteria: 'NMT 5 EU/g', operator: 'NMT', max: 5, unit: 'EU/g', isOutsideLab: true }),
      tp('Pathogen in general', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true }),
      tp('TAMC', M, 'Quantitative', { acceptanceCriteria: 'NMT 1000 CFU/g', operator: 'NMT', max: 1000, unit: 'CFU/g', isOutsideLab: true }),
      tp('TYMC', M, 'Quantitative', { acceptanceCriteria: 'NMT 100 CFU/g', operator: 'NMT', max: 100, unit: 'CFU/g', isOutsideLab: true }),
      tp('Escherichia coli', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true }),
      tp('Salmonella', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true }),
      tp('Pseudomonas aeruginosa', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true }),
      tp('Staphylococcus aureus', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true }),
      tp('Coliforms', M, 'Qualitative', { acceptanceCriteria: 'Should be absent', isOutsideLab: true })
    ];
  }

  var _seed_submitters = {
    'demo.sneha': { fullName: 'Sneha Verma', designation: 'QC Executive', initials: 'SV', roleShort: 'QC Exec' },
    'demo.meera': { fullName: 'Meera Iyer', designation: 'QC Executive', initials: 'MI', roleShort: 'QC Exec' },
    'demo.rohit': { fullName: 'Rohit Nair', designation: 'QC Executive', initials: 'RN', roleShort: 'QC Exec' }
  };

  var _seed_batches = [
    {
      batchNo: 'GCN/010526', arn: '2026FG03', product: 'Glycine IP', pharmacopoeia: 'IP',
      customer: 'In-house (captive)', currentPhase: 'AWS', assignedQcExec: 'qc.exec',
      createdByQcMgr: 'qc.mgr', qcApprover: 'qc.mgr', qaSigner: 'qa.mgr',
      status: 'IN_PROGRESS', mfgDate: 'May 2026', expiryDate: 'Apr 2031',
      testRequestSheet: 'TRS-2026-0142', batchSize: 500, batchSizeUnit: 'kg',
      quantitySampled: 300, quantitySampledUnit: 'g',
      receivedDate: '26-May-2026', testingDate: '28-May-2026',
      lastActivity: 'Today · 08:10', masterCode: 'FG00038', pipelineColumn: 'AWS in Progress',
      phaseLabel: 'AWS in progress', releasedAt: null, releasedBy: null, coaDocNo: 'COA/GCN/010526'
    },
    {
      batchNo: 'PCM/009824', arn: '2026FG01', product: 'Paracetamol BP', pharmacopoeia: 'BP',
      customer: 'Medico Labs', currentPhase: 'AWS', assignedQcExec: 'qc.exec',
      createdByQcMgr: 'qc.mgr', qcApprover: 'qc.mgr', qaSigner: 'qa.mgr',
      status: 'IN_PROGRESS', mfgDate: 'Apr 2026', expiryDate: 'Mar 2029',
      lastActivity: 'Today · 07:52', masterCode: 'FG00112', pipelineColumn: 'AWS in Progress',
      phaseLabel: 'AWS in progress', releasedAt: null, releasedBy: null, coaDocNo: 'COA/PCM/009824'
    },
    {
      batchNo: 'MET/020526', arn: '2026FG11', product: 'Metformin USP', pharmacopoeia: 'USP',
      customer: 'Reliance Pharma', currentPhase: 'MOA', assignedQcExec: 'qc.exec',
      createdByQcMgr: 'qc.mgr', qcApprover: 'qc.mgr', qaSigner: 'qa.mgr',
      status: 'IN_PROGRESS', mfgDate: 'Mar 2026', expiryDate: 'Mar 2030',
      lastActivity: 'Yesterday · 17:22', masterCode: 'FG00201', pipelineColumn: 'MOA in Progress',
      phaseLabel: 'MOA in progress', releasedAt: null, releasedBy: null, coaDocNo: 'COA/MET/020526'
    },
    {
      batchNo: 'ASC/120526', arn: '2026FG31', product: 'Ascorbic Acid IP', pharmacopoeia: 'IP',
      customer: 'Vita Healthcare', currentPhase: 'COA', assignedQcExec: 'qc.exec',
      createdByQcMgr: 'qc.mgr', qcApprover: 'qc.mgr', qaSigner: 'qa.mgr',
      status: 'RELEASED', mfgDate: 'Dec 2025', expiryDate: 'Nov 2027',
      lastActivity: '28-May · 14:05', masterCode: 'FG00305', pipelineColumn: 'Released',
      phaseLabel: 'Released', releasedAt: '28 Apr 2026', releasedAtTime: '09:20', releasedBy: 'qa.mgr',
      coaDocNo: 'COA/ASC/120526', complies: true
    },
    {
      batchNo: 'CAF/080526', arn: '2026FG18', product: 'Caffeine Anhydrous EP', pharmacopoeia: 'EP',
      customer: 'Solvay Chemicals', currentPhase: 'SPEC', assignedQcExec: 'demo.meera',
      createdByQcMgr: 'qc.mgr', qcApprover: null, qaSigner: null,
      status: 'IN_PROGRESS', mfgDate: 'Jan 2026', expiryDate: 'Dec 2030',
      lastActivity: '27-May · 10:31', masterCode: 'FG00418', pipelineColumn: 'New',
      phaseLabel: 'New batch', releasedAt: null, releasedBy: null, coaDocNo: 'COA/CAF/080526'
    },
    {
      batchNo: 'DEX/005412', arn: '2026FG22', product: 'Dextrose Monohydrate IP', pharmacopoeia: 'IP',
      customer: 'In-house (captive)', currentPhase: 'AWS', assignedQcExec: 'demo.rohit',
      createdByQcMgr: 'qc.mgr', qcApprover: 'qc.mgr', qaSigner: null,
      status: 'IN_PROGRESS', mfgDate: 'Feb 2026', expiryDate: 'Jan 2029',
      lastActivity: '27-May · 09:14', masterCode: 'FG00522', pipelineColumn: 'Awaiting QA Sign-off',
      phaseLabel: 'Awaiting QA sign-off', releasedAt: null, releasedBy: null, coaDocNo: 'COA/DEX/005412'
    }
  ];

  var _seed_documents = [
    { docNo: 'SPEC/FG00038/01', type: 'SPEC', batchNo: 'GCN/010526', product: 'Glycine IP', pharmacopoeia: 'IP', masterCode: 'FG00038', status: 'QA_SIGNED', createdBy: 'qc.exec', submittedAt: '26-May · 14:09', approvedBy: 'qc.mgr', approvedAt: '27-May · 15:48', signedBy: 'qa.mgr', signedAt: '28-May · 11:04', rejectReason: null },
    { docNo: 'MOA/FG00038/01', type: 'MOA', batchNo: 'GCN/010526', product: 'Glycine IP', pharmacopoeia: 'IP', masterCode: 'FG00038', status: 'QA_SIGNED', createdBy: 'qc.exec', submittedAt: '27-May · 09:10', approvedBy: 'qc.mgr', approvedAt: '28-May · 08:15', signedBy: 'qa.mgr', signedAt: '29-May · 09:32', rejectReason: null },
    { docNo: 'AWS/GCN/01', type: 'AWS', batchNo: 'GCN/010526', product: 'Glycine IP', pharmacopoeia: 'IP', masterCode: 'FG00038', status: 'QC_APPROVED', createdBy: 'qc.exec', submittedAt: 'Today · 06:50', approvedBy: 'qc.mgr', approvedAt: 'Today · 09:48', signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'COA/GCN/010526', type: 'COA', batchNo: 'GCN/010526', product: 'Glycine IP', pharmacopoeia: 'IP', masterCode: 'FG00038', status: 'DRAFT', createdBy: null, submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },

    { docNo: 'SPEC/FG00112/03', type: 'SPEC', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'QC_APPROVED', createdBy: 'qc.exec', submittedAt: 'Today · 07:52', approvedBy: 'qc.mgr', approvedAt: 'Today · 08:30', signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'SPEC/FG00112/01', type: 'SPEC', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'REJECTED', createdBy: 'qc.exec', submittedAt: '31-May · 14:20', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: 'Sulphated ash entered as NMT 0.25 %; Master specifies NMT 0.10 %. Mandatory criteria cannot be edited at SPEC.', rejectedBy: 'qc.mgr', rejectedAt: '31-May · 16:40' },
    { docNo: 'SPEC/FG00112/02', type: 'SPEC', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'DRAFT', createdBy: 'qc.exec', submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'MOA/FG00112/01', type: 'MOA', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'DRAFT', createdBy: 'qc.exec', submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'SPEC/FG00112/04', type: 'SPEC', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'SUBMITTED', createdBy: 'qc.mgr', submittedAt: 'Today · 09:15', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'AWS/FG00112/01', type: 'AWS', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'QC_APPROVED', createdBy: 'qc.exec', submittedAt: 'Today · 08:40', approvedBy: 'qc.mgr', approvedAt: 'Today · 09:00', signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'COA/PCM/009824', type: 'COA', batchNo: 'PCM/009824', product: 'Paracetamol BP', pharmacopoeia: 'BP', masterCode: 'FG00112', status: 'DRAFT', createdBy: null, submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },

    { docNo: 'SPEC/FG00201/01', type: 'SPEC', batchNo: 'MET/020526', product: 'Metformin USP', pharmacopoeia: 'USP', masterCode: 'FG00201', status: 'SUBMITTED', createdBy: 'qc.exec', submittedAt: 'Yesterday · 17:31', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'MOA/FG00201/01', type: 'MOA', batchNo: 'MET/020526', product: 'Metformin USP', pharmacopoeia: 'USP', masterCode: 'FG00201', status: 'DRAFT', createdBy: 'qc.exec', submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'AWS/FG00201/01', type: 'AWS', batchNo: 'MET/020526', product: 'Metformin USP', pharmacopoeia: 'USP', masterCode: 'FG00201', status: 'DRAFT', createdBy: 'qc.exec', submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'COA/MET/020526', type: 'COA', batchNo: 'MET/020526', product: 'Metformin USP', pharmacopoeia: 'USP', masterCode: 'FG00201', status: 'DRAFT', createdBy: null, submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },

    { docNo: 'SPEC/FG00305/01', type: 'SPEC', batchNo: 'ASC/120526', product: 'Ascorbic Acid IP', pharmacopoeia: 'IP', masterCode: 'FG00305', status: 'ISSUED', createdBy: 'qc.exec', submittedAt: '20-Apr · 10:00', approvedBy: 'qc.mgr', approvedAt: '22-Apr · 14:30', signedBy: 'qa.mgr', signedAt: '28-Apr · 09:20', rejectReason: null },
    { docNo: 'MOA/FG00305/01', type: 'MOA', batchNo: 'ASC/120526', product: 'Ascorbic Acid IP', pharmacopoeia: 'IP', masterCode: 'FG00305', status: 'ISSUED', createdBy: 'qc.exec', submittedAt: '21-Apr · 11:15', approvedBy: 'qc.mgr', approvedAt: '23-Apr · 09:00', signedBy: 'qa.mgr', signedAt: '28-Apr · 09:25', rejectReason: null },
    { docNo: 'AWS/FG00305/01', type: 'AWS', batchNo: 'ASC/120526', product: 'Ascorbic Acid IP', pharmacopoeia: 'IP', masterCode: 'FG00305', status: 'ISSUED', createdBy: 'qc.exec', submittedAt: '24-Apr · 08:40', approvedBy: 'qc.mgr', approvedAt: '25-Apr · 16:10', signedBy: 'qa.mgr', signedAt: '27-Apr · 11:00', rejectReason: null },
    { docNo: 'COA/ASC/120526', type: 'COA', batchNo: 'ASC/120526', product: 'Ascorbic Acid IP', pharmacopoeia: 'IP', masterCode: 'FG00305', status: 'ISSUED', createdBy: 'qc.exec', submittedAt: '28-Apr · 09:20', approvedBy: 'qc.mgr', approvedAt: '28-Apr · 09:22', signedBy: 'qa.mgr', signedAt: '28-Apr · 09:20', rejectReason: null },

    { docNo: 'SPEC/FG00418/01', type: 'SPEC', batchNo: 'CAF/080526', product: 'Caffeine Anhydrous EP', pharmacopoeia: 'EP', masterCode: 'FG00418', status: 'SUBMITTED', createdBy: 'demo.meera', submittedAt: 'Yesterday · 11:09', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'MOA/FG00418/01', type: 'MOA', batchNo: 'CAF/080526', product: 'Caffeine Anhydrous EP', pharmacopoeia: 'EP', masterCode: 'FG00418', status: 'SUBMITTED', createdBy: 'demo.meera', submittedAt: 'Today · 08:05', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'AWS/FG00418/01', type: 'AWS', batchNo: 'CAF/080526', product: 'Caffeine Anhydrous EP', pharmacopoeia: 'EP', masterCode: 'FG00418', status: 'DRAFT', createdBy: 'demo.meera', submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'COA/CAF/080526', type: 'COA', batchNo: 'CAF/080526', product: 'Caffeine Anhydrous EP', pharmacopoeia: 'EP', masterCode: 'FG00418', status: 'DRAFT', createdBy: null, submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },

    { docNo: 'SPEC/FG00522/02', type: 'SPEC', batchNo: 'DEX/005412', product: 'Dextrose Monohydrate IP', pharmacopoeia: 'IP', masterCode: 'FG00522', status: 'QC_APPROVED', createdBy: 'demo.rohit', submittedAt: 'Yesterday · 14:40', approvedBy: 'qc.mgr', approvedAt: 'Yesterday · 17:50', signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'MOA/FG00522/01', type: 'MOA', batchNo: 'DEX/005412', product: 'Dextrose Monohydrate IP', pharmacopoeia: 'IP', masterCode: 'FG00522', status: 'QC_APPROVED', createdBy: 'demo.rohit', submittedAt: 'Yesterday · 15:10', approvedBy: 'qc.mgr', approvedAt: 'Yesterday · 15:10', signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'AWS/FG00522/01', type: 'AWS', batchNo: 'DEX/005412', product: 'Dextrose Monohydrate IP', pharmacopoeia: 'IP', masterCode: 'FG00522', status: 'SUBMITTED', createdBy: 'demo.rohit', submittedAt: 'Yesterday · 16:18', approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null },
    { docNo: 'COA/DEX/005412', type: 'COA', batchNo: 'DEX/005412', product: 'Dextrose Monohydrate IP', pharmacopoeia: 'IP', masterCode: 'FG00522', status: 'DRAFT', createdBy: null, submittedAt: null, approvedBy: null, approvedAt: null, signedBy: null, signedAt: null, rejectReason: null }
  ];

  var _seed_notifications = [
    { recipientUsername: 'qc.mgr', category: 'action', titlePrefix: 'Approval pending:', docNo: 'AWS/FG00522/01', messageHtml: '<span class="who">Rohit Nair</span> submitted AWS for DEX/005412', timestamp: '2 h ago', dayGroup: 'Today · 28-May-2026', unread: true, route: 'Document Approval Review.html?docNo=AWS/FG00522/01' },
    { recipientUsername: 'qc.mgr', category: 'action', titlePrefix: 'Approval pending:', docNo: 'SPEC/FG00201/01', messageHtml: '<span class="who">Kavya Patel</span> submitted SPEC for Metformin USP', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false, route: 'Document Approval Review.html?docNo=SPEC/FG00201/01' },
    { recipientUsername: 'qc.mgr', category: 'info', titlePrefix: 'QC approved:', docNo: 'SPEC/FG00112/03', messageHtml: '<span class="who">You</span> approved · awaiting QA signature', timestamp: 'Today · 08:30', dayGroup: 'Today · 28-May-2026', unread: true },
    { recipientUsername: 'qc.mgr', category: 'info', titlePrefix: 'Calibration overdue:', docNo: 'INST-HPLC-04', messageHtml: 'Next calibration was due 26-May-2026 · in-use locked', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false },
    { recipientUsername: 'qc.mgr', category: 'info', titlePrefix: 'Released:', docNo: 'COA/ASC/120526', messageHtml: 'Ascorbic Acid IP batch ASC/120526 released by QA', timestamp: '2 d ago', dayGroup: 'Earlier this week', unread: false },

    { recipientUsername: 'qc.exec', category: 'action', titlePrefix: 'Returned for rework:', docNo: 'SPEC/FG00112/01', messageHtml: '<span class="who">Priya Mehta (QC)</span> rejected your SPEC submission', timestamp: '31-May · 16:40', dayGroup: 'Earlier this week', unread: true, route: 'Create SPEC.html?docNo=SPEC/FG00112/02' },
    { recipientUsername: 'qc.exec', category: 'action', titlePrefix: 'Draft reminder:', docNo: 'AWS/GCN/01', messageHtml: 'Complete AWS data entry for Glycine IP · GCN/010526', timestamp: '5 h ago', dayGroup: 'Today · 28-May-2026', unread: true, route: 'AWS Data Entry.html?docNo=AWS/GCN/01' },
    { recipientUsername: 'qc.exec', category: 'info', titlePrefix: 'QC approved:', docNo: 'SPEC/FG00038/01', messageHtml: '<span class="who">Priya Mehta (QC)</span> approved your SPEC · forwarded to QA', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false },
    { recipientUsername: 'qc.exec', category: 'info', titlePrefix: 'Mentioned:', docNo: 'GCN/010526', messageHtml: '<span class="who">Priya Mehta</span> mentioned you in a batch comment', timestamp: '8 h ago', dayGroup: 'Today · 28-May-2026', unread: true },

    { recipientUsername: 'qa.mgr', category: 'action', titlePrefix: 'Signature required:', docNo: 'SPEC/FG00112/03', messageHtml: '<span class="who">Priya Mehta (QC)</span> approved · awaiting your QA signature', timestamp: '2 h ago', dayGroup: 'Today · 28-May-2026', unread: true, route: 'Document Approval Review.html?docNo=SPEC/FG00112/03&role=qa' },
    { recipientUsername: 'qa.mgr', category: 'action', titlePrefix: 'Signature required:', docNo: 'MOA/FG00522/01', messageHtml: '<span class="who">Priya Mehta (QC)</span> approved MOA for Dextrose batch', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false, route: 'Document Approval Review.html?docNo=MOA/FG00522/01&role=qa' },
    { recipientUsername: 'qa.mgr', category: 'info', titlePrefix: 'COA ready:', docNo: 'COA/ASC/120526', messageHtml: 'Ascorbic Acid batch ready for register update', timestamp: '3 d ago', dayGroup: 'Earlier this week', unread: false },
    { recipientUsername: 'qa.mgr', category: 'info', titlePrefix: 'Issued:', docNo: 'SPEC/FG00305/01', messageHtml: 'Ascorbic Acid IP SPEC issued to production', timestamp: '10 h ago', dayGroup: 'Today · 28-May-2026', unread: true },

    { recipientUsername: 'qa.exec', category: 'action', titlePrefix: 'Review assigned:', docNo: 'SPEC/FG00112/03', messageHtml: '<span class="who">Sanjay Reddy (QA)</span> delegated QA review', timestamp: '6 h ago', dayGroup: 'Today · 28-May-2026', unread: true, route: 'Document Approval Review.html?docNo=SPEC/FG00112/03&role=qa' },
    { recipientUsername: 'qa.exec', category: 'info', titlePrefix: 'QC approved:', docNo: 'SPEC/FG00522/02', messageHtml: '<span class="who">Priya Mehta (QC)</span> marked reviewed · awaiting QA head', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false },
    { recipientUsername: 'qa.exec', category: 'info', titlePrefix: 'Released:', docNo: 'COA/ASC/120526', messageHtml: 'Lot ASC/120526 — Ascorbic Acid IP released', timestamp: '2 d ago', dayGroup: 'Earlier this week', unread: false },

    { recipientUsername: 'admin', category: 'info', titlePrefix: 'User login:', docNo: 'SESSION', messageHtml: '<span class="who">Rajesh Kumar</span> signed in from corporate network', timestamp: 'Today · 09:00', dayGroup: 'Today · 28-May-2026', unread: false },
    { recipientUsername: 'admin', category: 'info', titlePrefix: 'Audit export:', docNo: 'AUDIT-LOG', messageHtml: 'Weekly audit log export completed successfully', timestamp: 'Yesterday', dayGroup: 'Yesterday · 27-May-2026', unread: false },
    { recipientUsername: 'admin', category: 'action', titlePrefix: 'Account review:', docNo: 'USER-qc.exec', messageHtml: 'Password rotation due for <span class="who">Kavya Patel</span> in 14 days', timestamp: '3 d ago', dayGroup: 'Earlier this week', unread: true },
    { recipientUsername: 'admin', category: 'info', titlePrefix: 'System:', docNo: 'VALIDATION', messageHtml: 'Validated environment health check passed', timestamp: '5 d ago', dayGroup: 'Earlier this week', unread: false }
  ];

  var _seed_auditLog = [
    { evt: 'EVT-2026-44821', ts: '08 Jun 2026', tt: '14:32:17', actorUsername: 'admin', action: 'Login', etype: 'Session', entity: '—', field: '—', old: '', neu: '', comment: 'Signed in from corporate network', ip: '10.4.2.18', geo: 'Captured' },
    { evt: 'EVT-2026-44805', ts: '08 Jun 2026', tt: '11:04:17', actorUsername: 'qa.mgr', action: 'Sign', etype: 'Document', entity: 'COA/ASC/120526', field: 'Status', old: 'Pending', neu: 'Issued', comment: 'Batch released — Production and Stores notified', ip: '10.4.2.51', geo: 'Captured' },
    { evt: 'EVT-2026-44790', ts: '08 Jun 2026', tt: '09:48:02', actorUsername: 'qc.mgr', action: 'Approve', etype: 'Document', entity: 'AWS/GCN/01', field: 'Status', old: 'Submitted', neu: 'Approved', comment: 'All mandatory parameters verified against Master', ip: '10.4.2.33', geo: 'Captured' },
    { evt: 'EVT-2026-44771', ts: '07 Jun 2026', tt: '16:40:17', actorUsername: 'qc.mgr', action: 'Reject', etype: 'Document', entity: 'SPEC/FG00112/01', field: 'Sulphated ash', old: 'NMT 0.25 %', neu: 'NMT 0.10 %', comment: 'Mandatory criteria cannot be altered at SPEC stage — correct and re-submit', ip: '10.4.2.33', geo: 'Captured' },
    { evt: 'EVT-2026-44752', ts: '07 Jun 2026', tt: '10:22:51', actorUsername: 'qc.exec', action: 'Submit', etype: 'Document', entity: 'SPEC/FG00038/01', field: 'Status', old: 'Draft', neu: 'Submitted', comment: 'Corrected the Sulphated ash limit and re-submitted', ip: '10.4.2.27', geo: 'Captured' },
    { evt: 'EVT-2026-44740', ts: '07 Jun 2026', tt: '08:15:09', actorUsername: 'qc.exec', action: 'OOS Ack', etype: 'Batch', entity: 'GCN/010526', field: 'Dissolution', old: '', neu: '', comment: 'Acknowledged OOS investigation — investigation opened', ip: '10.4.2.27', geo: 'Captured' },
    { evt: 'EVT-2026-44722', ts: '06 Jun 2026', tt: '17:02:44', actorUsername: 'qa.exec', action: 'Expired Ack', etype: 'Instrument', entity: 'INST-HPLC-04', field: 'Calibration', old: 'Valid', neu: 'Expired', comment: 'Acknowledged expired instrument before data entry', ip: '10.4.2.44', geo: 'Permission Denied' },
    { evt: 'EVT-2026-44705', ts: '06 Jun 2026', tt: '13:55:08', actorUsername: 'qc.exec', action: 'Create', etype: 'Document', entity: 'SPEC/FG00038/01', field: '—', old: '', neu: 'Draft', comment: 'Created from Product Master FG00038 · Revision 02', ip: '10.4.2.27', geo: 'Captured' },
    { evt: 'EVT-2026-44688', ts: '06 Jun 2026', tt: '09:20:33', actorUsername: 'qa.mgr', action: 'Issue', etype: 'Document', entity: 'MOA/FG00038/01', field: 'Status', old: 'Approved', neu: 'Issued', comment: 'Issued blank AWS to QC for data entry', ip: '10.4.2.51', geo: 'Captured' },
    { evt: 'EVT-2026-44661', ts: '05 Jun 2026', tt: '15:48:55', actorUsername: 'qc.mgr', action: 'Approve', etype: 'Master', entity: 'FG00038 · Rev 02', field: 'Status', old: 'Draft', neu: 'Approved', comment: 'Master revision approved and made effective', ip: '10.4.2.33', geo: 'Captured' },
    { evt: 'EVT-2026-44640', ts: '05 Jun 2026', tt: '11:31:20', actorUsername: 'qa.exec', action: 'Login', etype: 'Session', entity: '—', field: '—', old: '', neu: '', comment: 'Signed in from corporate network', ip: '10.4.2.44', geo: 'Captured' },
    { evt: 'EVT-2026-44619', ts: '05 Jun 2026', tt: '08:07:12', actorUsername: 'admin', action: 'Create', etype: 'User', entity: 'qa.exec', field: 'Account', old: '', neu: 'Active', comment: 'Created user Anand Joshi · QA Executive', ip: '10.4.2.18', geo: 'Captured' },
    { evt: 'EVT-2026-44602', ts: '04 Jun 2026', tt: '16:18:44', actorUsername: 'demo.rohit', action: 'Submit', etype: 'Document', entity: 'AWS/FG00522/01', field: 'Status', old: 'Draft', neu: 'Submitted', comment: 'AWS submitted for Dextrose Monohydrate batch', ip: '10.4.2.29', geo: 'Captured' },
    { evt: 'EVT-2026-44588', ts: '04 Jun 2026', tt: '14:40:17', actorUsername: 'qc.mgr', action: 'Approve', etype: 'Document', entity: 'SPEC/FG00112/03', field: 'Status', old: 'Submitted', neu: 'Approved', comment: 'Forwarded to QA for signature', ip: '10.4.2.33', geo: 'Captured' },
    { evt: 'EVT-2026-44570', ts: '04 Jun 2026', tt: '11:09:33', actorUsername: 'demo.meera', action: 'Submit', etype: 'Document', entity: 'SPEC/FG00418/01', field: 'Status', old: 'Draft', neu: 'Submitted', comment: 'SPEC submitted for Caffeine Anhydrous EP', ip: '10.4.2.31', geo: 'Captured' },
    { evt: 'EVT-2026-44555', ts: '03 Jun 2026', tt: '17:31:20', actorUsername: 'qc.exec', action: 'Submit', etype: 'Document', entity: 'SPEC/FG00201/01', field: 'Status', old: 'Draft', neu: 'Submitted', comment: 'Metformin USP SPEC submitted for approval', ip: '10.4.2.27', geo: 'Captured' },
    { evt: 'EVT-2026-44540', ts: '03 Jun 2026', tt: '09:32:18', actorUsername: 'qa.mgr', action: 'Sign', etype: 'Document', entity: 'MOA/FG00038/01', field: 'Status', old: 'Approved', neu: 'Signed', comment: 'QA signature applied with geo capture', ip: '10.4.2.51', geo: 'Captured' },
    { evt: 'EVT-2026-44525', ts: '02 Jun 2026', tt: '15:48:02', actorUsername: 'qc.mgr', action: 'Approve', etype: 'Document', entity: 'SPEC/FG00038/01', field: 'Status', old: 'Submitted', neu: 'Approved', comment: 'Forwarded to QA for signature. All mandatory parameters verified.', ip: '10.4.2.33', geo: 'Captured' }
  ];

  var _seed_timelineEvents = {
    'SPEC/FG00038/01': [
      { type: 'sign', date: '28-May-2026', time: '11:04:38 IST', actor: 'qa.mgr', action: 'Signed SPEC', rev: 'Revision 00', note: 'Electronic signature applied with password re-authentication. Document locked — no further edits permitted.', coords: true },
      { type: 'approve', date: '27-May-2026', time: '15:48:02 IST', actor: 'qc.mgr', action: 'Approved SPEC', rev: 'Revision 00', note: 'Forwarded to QA for signature. All mandatory parameters verified against Product Master <span class="mono">FG00038 · Revision 02</span>.' },
      { type: 'submit', date: '27-May-2026', time: '10:22:51 IST', actor: 'qc.exec', action: 'Re-submitted SPEC', rev: 'Revision 00', note: 'Corrected the Sulphated ash limit to <span class="mono">NMT 0.10 %</span> per the Master and re-submitted for approval.' },
      { type: 'reject', date: '26-May-2026', time: '16:40:17 IST', actor: 'qc.mgr', action: 'Rejected SPEC', rev: 'Revision 00', comment: 'Sulphated ash entered as NMT 0.25 %; Product Master specifies NMT 0.10 %. Mandatory criteria cannot be altered at the SPEC stage — correct and re-submit.', note: 'Status returned to <b>DRAFT</b>. Document unlocked for editing by the preparer.' },
      { type: 'submit', date: '26-May-2026', time: '14:09:33 IST', actor: 'qc.exec', action: 'Submitted SPEC', rev: 'Revision 00', note: 'Submitted to QC Manager for review. Status changed <span class="mono">DRAFT → SUBMITTED</span>.' },
      { type: 'neutral', date: '25-May-2026', time: '11:30:00 IST', actor: 'qc.exec', action: 'Configured customer tab', rev: 'Revision 00', note: 'Activated sieve analysis optional test with customer limit override.' },
      { type: 'neutral', date: '24-May-2026', time: '09:15:22 IST', actor: 'qc.exec', action: 'Edited test parameters', rev: 'Revision 00', note: 'Inherited 33 mandatory tests from Product Master FG00038.' },
      { type: 'neutral', date: '23-May-2026', time: '13:40:00 IST', actor: 'qc.exec', action: 'Created SPEC', rev: 'Revision 00', note: 'Created from registered Product Master <span class="mono">FG00038 · Revision 02</span>.' }
    ]
  };

  var _seed_products = [
    {
      id: 'FG00038', name: 'Glycine IP', familyCode: 'FG00038', shortCode: 'GCN',
      pharmacopoeia: 'IP', molecularFormula: 'C2H5NO2', molecularWeight: '75.1 g/mole',
      chemicalName: 'Glycine',
      technicalName: 'Aminoacetic acid',
      composition: 'Glycine IP — 100 % w/w',
      originSource: 'Synthetic — amino acid manufacture',
      methodOfProduction: 'Chemical synthesis from chloroacetic acid and ammonia',
      gradeCategory: 'Pharmaceutical · Excipient',
      shelfLifeMonths: 60,
      storageConditions: 'Preserve in well-closed container at room temperature.',
      specialHandling: 'Handle with care; avoid exposure to moisture.',
      packingPrimary: 'HDPE drum with double LDPE liner',
      packingSecondary: 'Corrugated fibreboard outer with pallet wrap',
      samplingPlan: '100 %',
      retainedSampleQty: '30 gm',
      retainedRetentionPeriod: 'Expiry + 1 year',
      currentRevision: 2, status: 'QA_SIGNED',
      signedAt: '28-May · 11:04', createdBy: 'qc.mgr', approvedBy: 'qc.mgr', signedBy: 'qa.mgr',
      pharmacopoeiaTag: 'IP 2022 · Monograph 1.2.41',
      testParameters: buildGlycineTestParameters(),
      moaSections: [
        { testName: 'Description', procedure: 'Examine the sample under diffuse daylight against a white and a black background. Record colour, form and odour.' },
        { testName: 'Solubility', procedure: 'Transfer ~1 g to test tubes containing water and ethanol respectively. Shake and observe the degree of dissolution at room temperature.' },
        { testName: 'Identification A — By IR', procedure: 'Record the IR absorption spectrum of the sample (KBr disc) using FTIR-001. Compare with the spectrum of Reference Standard Glycine.' },
        { testName: 'Identification B — By chemical reaction', procedure: 'Perform the ninhydrin reaction and the specified chemical identity tests. A violet colour confirms the amino-acid group.' },
        { testName: 'Appearance of solution', procedure: 'Dissolve 10.0 g in 100 mL of CO₂-free water. Compare clarity and colour against the reference suspensions/colours.' },
        { testName: 'pH', procedure: 'Prepare a 5 % w/v solution in CO₂-free water. Measure pH at 25 °C using PH-001, calibrated with Buffer pH 4.0 and pH 7.0.' },
        { testName: 'Chlorides', procedure: 'Prepare the test solution and the standard (chloride) solution. Develop opalescence with silver nitrate; the test must not exceed the standard.' },
        { testName: 'Heavy metals', procedure: 'Prepare per the limit test for heavy metals. Any brown colour produced must not be more intense than the lead standard solution.' },
        { testName: 'Sulphated ash', procedure: 'Ignite a tared silica crucible to constant weight. Add ~1 g sample, moisten with sulphuric acid, char gently, then ignite at 600 ± 25 °C to constant weight.' },
        { testName: 'Loss on drying', procedure: 'Weigh accurately about 2.5 g into a tared, flat-bottomed dish. Dry at 105 °C for 2 hours, cool in a desiccator and weigh. Repeat to constant weight.' },
        { testName: 'Assay on dried basis', procedure: 'Prepare standard and sample solutions per the monograph. Inject per the sequence table. Compute assay against the Reference Standard, corrected to the dried basis using Loss on drying.' }
      ]
    },
    {
      id: 'FG00112', name: 'Paracetamol BP', familyCode: 'FG00112', shortCode: 'PCM',
      pharmacopoeia: 'BP', molecularFormula: 'C₈H₉NO₂', molecularWeight: '151.16 g/mol',
      shelfLifeMonths: 36, storageConditions: 'Store below 25 °C, protected from light and moisture.',
      samplingPlan: 'Random sample from each container; minimum 1 % of batch quantity.',
      retainedSampleQty: '2 × 150 g', currentRevision: 2, status: 'QA_SIGNED',
      signedAt: '15-Apr · 10:22', createdBy: 'qc.mgr', approvedBy: 'qc.mgr', signedBy: 'qa.mgr',
      pharmacopoeiaTag: 'BP 2024 · Monograph 2.1.18',
      testParameters: [
        { name: 'Description', type: 'Qualitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: 'White crystalline powder', operator: null, min: null, max: null, unit: null, isMandatory: true, isOutsideLab: false },
        { name: 'Identification by IR', type: 'Qualitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: 'Spectrum corresponds to reference', operator: null, min: null, max: null, unit: null, isMandatory: true, isOutsideLab: false },
        { name: 'Melting point', type: 'Quantitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: '168 – 172 °C', operator: 'BETWEEN', min: 168, max: 172, unit: '°C', isMandatory: true, isOutsideLab: false },
        { name: 'Related substances', type: 'Quantitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: 'NMT 0.1 % each', operator: 'NMT', min: null, max: 0.1, unit: '%', isMandatory: true, isOutsideLab: false },
        { name: 'Residue on ignition', type: 'Quantitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: 'NMT 0.1 %', operator: 'NMT', min: null, max: 0.1, unit: '%', isMandatory: true, isOutsideLab: false },
        { name: 'Water', type: 'Quantitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: 'NMT 0.5 %', operator: 'NMT', min: null, max: 0.5, unit: '%', isMandatory: true, isOutsideLab: false },
        { name: 'Assay', type: 'Quantitative', pharmacopoeiaTag: 'BP', acceptanceCriteria: '98.5 – 101.0 %', operator: 'BETWEEN', min: 98.5, max: 101.0, unit: '%', isMandatory: true, isOutsideLab: false }
      ],
      moaSections: [
        { testName: 'Description', procedure: 'Examine the substance visually. Record colour, form and any odour noted at ambient conditions.' },
        { testName: 'Identification by IR', procedure: 'Prepare a KBr disc of the sample. Record the IR spectrum and compare with the Paracetamol reference spectrum on file.' },
        { testName: 'Melting point', procedure: 'Determine the melting point using a calibrated melting point apparatus. Report the range observed at heating rate 1 °C/min.' },
        { testName: 'Related substances', procedure: 'Analyse by HPLC per BP method. Compare impurity peaks against the system suitability and limit solutions.' },
        { testName: 'Residue on ignition', procedure: 'Ignite a tared crucible, add ~1 g sample, char without flaming, then ignite to constant weight at 600 °C.' },
        { testName: 'Water', procedure: 'Determine water content by Karl Fischer titration using calibrated KF reagent. Express result as % w/w.' },
        { testName: 'Assay', procedure: 'Prepare sample and standard solutions per BP monograph. Determine by UV spectrophotometry at 257 nm against reference standard.' }
      ]
    },
    {
      id: 'FG00201', name: 'Metformin USP', familyCode: 'FG00201', shortCode: 'MET',
      pharmacopoeia: 'USP', molecularFormula: 'C₄H₁₁N₅·HCl', molecularWeight: '165.63 g/mol',
      shelfLifeMonths: 48, storageConditions: 'Store at 20–25 °C; excursions permitted to 15–30 °C.',
      samplingPlan: 'Equal-weight composite from top, middle and bottom of each drum.',
      retainedSampleQty: '2 × 250 g', currentRevision: 1, status: 'QA_SIGNED',
      signedAt: '02-Mar · 14:55', createdBy: 'qc.mgr', approvedBy: 'qc.mgr', signedBy: 'qa.mgr',
      pharmacopoeiaTag: 'USP 43 · Monograph M-4120',
      testParameters: [
        { name: 'Description', type: 'Qualitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: 'White to off-white crystalline powder', operator: null, min: null, max: null, unit: null, isMandatory: true, isOutsideLab: false },
        { name: 'Identification', type: 'Qualitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: 'IR spectrum matches reference', operator: null, min: null, max: null, unit: null, isMandatory: true, isOutsideLab: false },
        { name: 'pH', type: 'Quantitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: '6.8 – 7.8', operator: 'BETWEEN', min: 6.8, max: 7.8, unit: null, isMandatory: true, isOutsideLab: false },
        { name: 'Heavy metals', type: 'Quantitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: 'NMT 20 ppm', operator: 'NMT', min: null, max: 20, unit: 'ppm', isMandatory: true, isOutsideLab: false },
        { name: 'Residue on ignition', type: 'Quantitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: 'NMT 0.1 %', operator: 'NMT', min: null, max: 0.1, unit: '%', isMandatory: true, isOutsideLab: false },
        { name: 'Related compounds', type: 'Quantitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: 'NMT 0.5 % total', operator: 'NMT', min: null, max: 0.5, unit: '%', isMandatory: true, isOutsideLab: false },
        { name: 'Assay', type: 'Quantitative', pharmacopoeiaTag: 'USP', acceptanceCriteria: '98.0 – 102.0 %', operator: 'BETWEEN', min: 98.0, max: 102.0, unit: '%', isMandatory: true, isOutsideLab: false }
      ],
      moaSections: [
        { testName: 'Description', procedure: 'Inspect the sample under normal laboratory lighting. Note colour, crystalline form and any atypical odour.' },
        { testName: 'Identification', procedure: 'Record IR spectrum of dried sample. Compare major peaks with USP Metformin Hydrochloride RS.' },
        { testName: 'pH', procedure: 'Prepare 1 % w/v aqueous solution. Measure pH at 25 °C with calibrated pH meter.' },
        { testName: 'Heavy metals', procedure: 'Proceed per USP <231> limit test. Compare colour intensity with lead standard solution.' },
        { testName: 'Residue on ignition', procedure: 'Weigh ~1 g into tared crucible. Ignite gently, then at 600 °C to constant weight. Calculate % residue.' },
        { testName: 'Related compounds', procedure: 'Analyse by HPLC per USP method. Report individual and total related compounds against specified limits.' },
        { testName: 'Assay', procedure: 'Titrate with 0.1 M perchloric acid VS using potentiometric endpoint. Calculate % assay on dried basis.' }
      ]
    }
  ];

  function buildGlycineSpecRevisionHistory() {
    return [
      { docNo: 'SPEC/FG00038/01 (R-00)', revisionMade: 'New specification', refCcNo: '-', effectiveDate: '21/04/2021' },
      { docNo: 'SPEC/FG00038/01 (R-01)', revisionMade: 'Format revised as per revised SOP QC/12. Some contents revised as per FSSAI requirement.', refCcNo: 'CC/2022/003', effectiveDate: '01/06/2022' },
      { docNo: 'SPEC/FG00038/01 (R-02)', revisionMade: 'Elemental impurity by AAS added. Ethylene oxide test added.', refCcNo: 'CC/2023/010', effectiveDate: '01/06/2023' }
    ];
  }

  function buildGlycineMoaRevisionHistory() {
    return [
      { docNo: 'MOA/FG00038/01 (R-00)', revisionMade: 'New method of analysis', refCcNo: '-', effectiveDate: '21/04/2021' },
      { docNo: 'MOA/FG00038/01 (R-01)', revisionMade: 'Format revised as per revised SOP QC/12. Methods aligned to revised specification.', refCcNo: 'CC/2022/003', effectiveDate: '01/06/2022' },
      { docNo: 'MOA/FG00038/01 (R-02)', revisionMade: 'Elemental impurity by AAS and ethylene oxide methods added.', refCcNo: 'CC/2023/010', effectiveDate: '01/06/2023' }
    ];
  }

  function hydrateRevisionDocument(doc) {
    if (!doc) return;
    if (doc.masterCode === 'FG00038') {
      if (doc.type === 'SPEC') {
        doc.revisionHistory = buildGlycineSpecRevisionHistory();
        doc.supersedes = 'SPEC/FG00038/01 (R-01)';
      } else if (doc.type === 'MOA') {
        doc.revisionHistory = buildGlycineMoaRevisionHistory();
        doc.supersedes = 'MOA/FG00038/01 (R-01)';
      } else if (doc.type === 'AWS') {
        doc.revisionHistory = [
          { docNo: 'AWS/GCN/01 (R-00)', revisionMade: 'Initial protocol', refCcNo: '-', effectiveDate: '21/04/2021' }
        ];
        doc.supersedes = null;
      } else if (doc.type === 'COA') {
        doc.revisionHistory = [
          { docNo: doc.docNo + ' (R-00)', revisionMade: 'Initial certificate template', refCcNo: '-', effectiveDate: '21/04/2021' }
        ];
        doc.supersedes = null;
      }
      return;
    }
    if (!doc.revisionHistory) {
      var prefix = doc.type === 'AWS' ? doc.docNo : (doc.type + '/' + doc.masterCode + '/01');
      doc.revisionHistory = [
        { docNo: prefix + ' (R-00)', revisionMade: 'New document', refCcNo: '-', effectiveDate: '—' }
      ];
    }
    if (doc.supersedes === undefined) doc.supersedes = null;
  }

  function hydrateProductRevision(product) {
    if (!product) return;
    if (product.id === 'FG00038') {
      product.revisionHistory = buildGlycineSpecRevisionHistory();
      if (product.storageConditions && product.storageConditions.indexOf('Store below 30') === 0) {
        product.storageConditions = 'Preserve in well-closed container at room temperature.';
      }
      return;
    }
    if (!product.revisionHistory) {
      product.revisionHistory = [
        { docNo: product.familyCode + ' (R-00)', revisionMade: 'New product master', refCcNo: '-', effectiveDate: '—' }
      ];
    }
  }

  function hydrateGlycineBatch(batch) {
    if (!batch || batch.batchNo !== 'GCN/010526') return;
    if (!batch.testRequestSheet) batch.testRequestSheet = 'TRS-2026-0142';
    if (!batch.batchSize) { batch.batchSize = 500; batch.batchSizeUnit = 'kg'; }
    if (!batch.quantitySampled) { batch.quantitySampled = 300; batch.quantitySampledUnit = 'g'; }
    if (!batch.receivedDate) batch.receivedDate = '26-May-2026';
    if (!batch.testingDate) batch.testingDate = '28-May-2026';
  }

  function makeSignRecord(user, location, signedAt) {
    return {
      username: user.username,
      fullName: user.fullName,
      signedAt: signedAt || new Date().toISOString(),
      location: location || 'AC Ahmedabad QA Office'
    };
  }

  function buildAwsTestResults(analyzerUser, checkerUser, analyzerName, checkerName, signedAt) {
    var at = signedAt || new Date().toISOString();
    var tr = {};
    AWS_TEST_KEYS.forEach(function (key) {
      tr[key] = {
        analyzedBy: { username: analyzerUser, fullName: analyzerName, signedAt: at, location: 'AC Ahmedabad QC Lab' },
        checkedBy: { username: checkerUser, fullName: checkerName, signedAt: at, location: 'AC Ahmedabad QC Lab' }
      };
    });
    return tr;
  }

  function hydrateAwsDocument(doc) {
    if (!doc || doc.type !== 'AWS') return;
    if (doc.docNo === 'AWS/GCN/01') {
      doc.issuanceStamp = {
        issuedBy: 'qa.mgr',
        issuedByName: 'Sanjay Reddy',
        issuedAt: '2026-05-26T09:30:00+05:30',
        issuedAtLocation: 'AC Ahmedabad QA Office'
      };
      doc.testResults = buildAwsTestResults('qc.exec', 'qc.exec2', 'Kavya Patel', 'Meera Iyer', '2026-05-26T10:00:00+05:30');
      return;
    }
    if (!doc.testResults) doc.testResults = {};
    if (doc.status === 'PENDING') {
      doc.issuanceStamp = null;
      return;
    }
    if (!doc.issuanceStamp) {
      doc.issuanceStamp = {
        issuedBy: 'qa.mgr',
        issuedByName: 'Sanjay Reddy',
        issuedAt: '2026-04-01T09:00:00+05:30',
        issuedAtLocation: 'AC Ahmedabad QA Office'
      };
    }
  }

  _seed_documents.forEach(hydrateAwsDocument);
  _seed_documents.forEach(hydrateRevisionDocument);
  _seed_products.forEach(hydrateProductRevision);
  _seed_batches.forEach(hydrateGlycineBatch);

  var BASELINE = {
    stateVersion: STATE_VERSION,
    batches: _seed_batches,
    documents: _seed_documents,
    notifications: _seed_notifications,
    auditLog: _seed_auditLog,
    timelineEvents: _seed_timelineEvents,
    submitters: _seed_submitters,
    products: _seed_products
  };

  var state;

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  var PRODUCT_ID_ALIASES = { FG00132: 'FG00038' };

  function resolveProductId(id) {
    if (!id) return id;
    var key = String(id).trim().toUpperCase();
    return PRODUCT_ID_ALIASES[key] || key;
  }

  function ensureGlycineBaseline(loaded) {
    var migrated = false;
    if (!loaded.products || !loaded.products.length) return migrated;
    var hasNew = loaded.products.some(function (p) { return p.id === 'FG00038'; });
    var hasOld = loaded.products.some(function (p) { return p.id === 'FG00132'; });
    if (!hasNew && (hasOld || loaded.stateVersion < 3)) {
      loaded.products = loaded.products.filter(function (p) { return p.id !== 'FG00132'; });
      loaded.products.unshift(deepClone(BASELINE.products[0]));
      migrated = true;
    }
    if (loaded.batches) {
      loaded.batches.forEach(function (b) {
        if (b.masterCode === 'FG00132') { b.masterCode = 'FG00038'; migrated = true; }
      });
    }
    if (loaded.documents) {
      loaded.documents.forEach(function (d) {
        if (d.masterCode === 'FG00132') { d.masterCode = 'FG00038'; migrated = true; }
        if (d.docNo) {
          d.docNo = d.docNo.replace('FG00132', 'FG00038').replace('AWS/FG00038/01', 'AWS/GCN/01');
        }
      });
    }
    return migrated;
  }

  function migrateState(loaded) {
    var migrated = false;
    if (!loaded.stateVersion || loaded.stateVersion < 3) {
      var baseline = deepClone(BASELINE);
      loaded.batches = baseline.batches;
      loaded.documents = baseline.documents;
      loaded.notifications = baseline.notifications;
      loaded.auditLog = baseline.auditLog;
      loaded.timelineEvents = baseline.timelineEvents;
      loaded.products = baseline.products;
      loaded.submitters = baseline.submitters;
      migrated = true;
    }
    if (!loaded.stateVersion || loaded.stateVersion < 4) {
      if (loaded.documents) loaded.documents.forEach(hydrateAwsDocument);
      migrated = true;
    }
    if (!loaded.stateVersion || loaded.stateVersion < 5) {
      if (loaded.documents) loaded.documents.forEach(hydrateRevisionDocument);
      if (loaded.products) loaded.products.forEach(hydrateProductRevision);
      if (loaded.batches) loaded.batches.forEach(hydrateGlycineBatch);
      migrated = true;
    }
    if (!loaded.products || !loaded.products.length) {
      loaded.products = deepClone(BASELINE.products);
      migrated = true;
    }
    if (loaded.stateVersion !== STATE_VERSION) {
      loaded.stateVersion = STATE_VERSION;
      migrated = true;
    }
    if (!loaded.batches) { loaded.batches = []; migrated = true; }
    if (!loaded.documents) { loaded.documents = []; migrated = true; }
    if (!loaded.notifications) { loaded.notifications = []; migrated = true; }
    if (!loaded.auditLog) { loaded.auditLog = []; migrated = true; }
    if (!loaded.timelineEvents) { loaded.timelineEvents = {}; migrated = true; }
    if (!loaded.submitters) { loaded.submitters = deepClone(BASELINE.submitters); migrated = true; }
    if (!loaded.products) { loaded.products = []; migrated = true; }
    if (loaded.notifications && typeof normalizeQmsLink === 'function') {
      loaded.notifications.forEach(function (n) {
        if (!n.route || n.route.indexOf('.html?') === -1) return;
        var fixed = normalizeQmsLink(n.route);
        if (fixed !== n.route) {
          n.route = fixed;
          migrated = true;
        }
      });
    }
    return migrated;
  }

  function initState() {
    var raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      try {
        state = JSON.parse(raw);
        if (migrateState(state) || ensureGlycineBaseline(state)) persistState();
      } catch (e) {
        state = deepClone(BASELINE);
        persistState();
      }
    } else {
      state = deepClone(BASELINE);
      persistState();
    }
  }

  function getState() {
    return state;
  }

  function persistState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ac-qms:data-changed'));
    }
  }

  initState();

  function getUserDisplay(username) {
    if (!username) return { fullName: '—', designation: '', initials: '?', roleShort: '' };
    var u = null;
    var key = String(username).trim().toLowerCase();
    if (typeof findUser === 'function') u = findUser(username);
    if (!u && key === 'demo.meera' && typeof findUser === 'function') {
      u = findUser('qc.exec2');
    }
    if (!u && typeof USERS !== 'undefined') {
      for (var i = 0; i < USERS.length; i++) {
        if (USERS[i].username.toLowerCase() === key) {
          u = USERS[i];
          break;
        }
      }
    }
    if (u) {
      var rs = u.designation.indexOf('Manager') !== -1 ? 'Mgr' : (u.designation.indexOf('Executive') !== -1 ? 'Exec' : u.designation);
      if (u.role === 'SUPER_ADMIN') rs = 'Super Admin';
      else if (u.department) rs = u.department + ' ' + rs;
      return { fullName: u.fullName, designation: u.designation, initials: initials(u.fullName), roleShort: rs };
    }
    var d = state.submitters[username];
    if (d) return d;
    return { fullName: username, designation: '', initials: '?', roleShort: '' };
  }

  function enrichAuditEntry(e) {
    var disp = getUserDisplay(e.actorUsername);
    var dept = '';
    if (typeof findUser === 'function') {
      var u = findUser(e.actorUsername);
      if (u && u.department) dept = u.department;
    }
    return {
      evt: e.evt, ts: e.ts, tt: e.tt,
      user: disp.fullName, role: disp.designation, dept: dept,
      action: e.action, etype: e.etype, entity: e.entity,
      field: e.field, old: e.old, neu: e.neu,
      comment: e.comment, ip: e.ip, geo: e.geo,
      actorUsername: e.actorUsername
    };
  }

  function getBatch(batchNo) {
    if (!batchNo) {
      for (var i = 0; i < state.batches.length; i++) {
        if (state.batches[i].batchNo === DEFAULT_BATCH) return state.batches[i];
      }
      return state.batches[0];
    }
    for (var b = 0; b < state.batches.length; b++) {
      if (state.batches[b].batchNo === batchNo) return state.batches[b];
    }
    return null;
  }

  function getDocument(docNo) {
    if (!docNo) {
      for (var j = 0; j < state.documents.length; j++) {
        if (state.documents[j].docNo === DEFAULT_DOC) return state.documents[j];
      }
      return state.documents[0];
    }
    for (var d = 0; d < state.documents.length; d++) {
      if (state.documents[d].docNo === docNo) return state.documents[d];
    }
    return null;
  }

  function docStatusRank(status) {
    var rank = { SUBMITTED: 6, QC_APPROVED: 5, QA_SIGNED: 4, ISSUED: 4, DRAFT: 3, REJECTED: 1 };
    return rank[status] || 0;
  }

  function pickBestDocForBatch(batchNo, type) {
    var best = null;
    var bestRank = -1;
    for (var i = 0; i < state.documents.length; i++) {
      var doc = state.documents[i];
      if (doc.batchNo !== batchNo || doc.type !== type) continue;
      var rank = docStatusRank(doc.status);
      if (rank > bestRank) {
        best = doc;
        bestRank = rank;
      }
    }
    return best;
  }

  function getDocumentsForBatch(batchNo) {
    return ['SPEC', 'MOA', 'AWS', 'COA'].map(function (t) {
      return pickBestDocForBatch(batchNo, t);
    }).filter(Boolean);
  }

  function getDocFromUrl() {
    var param = new URLSearchParams(location.search).get('docNo');
    if (!param) return null;
    return getDocument(param);
  }

  function getBatchFromUrl() {
    var param = new URLSearchParams(location.search).get('batchNo');
    if (!param) return getBatch(null);
    return getBatch(param);
  }

  function showParamNotFound(message, backHref, backLabel) {
    if (document.getElementById('acQmsParamError')) return;
    var main = document.querySelector('.main');
    if (!main) return;

    Array.prototype.forEach.call(main.children, function (child) {
      if (child.id === 'acQmsParamError') return;
      child.setAttribute('data-ac-qms-hidden', '1');
      child.style.display = 'none';
    });

    var user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    var dash = user && typeof getDashboardForUser === 'function'
      ? getDashboardForUser(user) : 'index.html';
    var href = backHref || dash;
    var label = backLabel || '← Return to your dashboard';

    var panel = document.createElement('div');
    panel.id = 'acQmsParamError';
    panel.style.cssText = 'padding:var(--s6);font-size:var(--text-sm);color:var(--text);';
    panel.innerHTML = '<p style="margin:0 0 var(--s4);line-height:1.5;">' + message + '</p>' +
      '<a href="' + href + '" style="font-size:var(--text-sm);font-weight:500;color:var(--primary);text-decoration:none;">' +
      label + '</a>';
    main.appendChild(panel);
  }

  function emptyListHtml(message) {
    return '<div class="list-empty">' + message + '</div>';
  }

  function getProducts() {
    return state.products;
  }

  function getProductById(id) {
    if (!id) return null;
    var key = resolveProductId(id);
    for (var i = 0; i < state.products.length; i++) {
      var p = state.products[i];
      if (p.id === key || p.familyCode === key) return p;
    }
    return null;
  }

  function productKey(product) {
    if (!product) return '';
    return product.id || product.familyCode || '';
  }

  function getProductFromUrl() {
    var param = new URLSearchParams(location.search).get('productId');
    if (!param || !String(param).trim()) return null;
    return getProductById(param);
  }

  function getProductByFamilyCode(code) {
    if (!code) return null;
    var key = String(code).trim().toUpperCase();
    for (var i = 0; i < state.products.length; i++) {
      var p = state.products[i];
      if (p.familyCode === key || p.id === key) return p;
    }
    return null;
  }

  function getProductByShortCode(code) {
    if (!code) return null;
    var key = String(code).trim().toUpperCase();
    for (var i = 0; i < state.products.length; i++) {
      if (state.products[i].shortCode === key) return state.products[i];
    }
    return null;
  }

  function qmsHref(page, query) {
    if (typeof window.qmsHref === 'function') return window.qmsHref(page, query);
    var path = encodeURI(String(page).replace(/\.html$/i, ''));
    if (!query) return path;
    if (typeof query === 'string') return path + (query.charAt(0) === '?' ? query : '?' + query);
    var parts = [];
    Object.keys(query).forEach(function (k) {
      var v = query[k];
      if (v === undefined || v === null || v === '') return;
      parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
    return parts.length ? path + '?' + parts.join('&') : path;
  }

  function productUrl(id) {
    return qmsHref('Product Master Editor.html', { productId: id || '' });
  }

  function productReviewUrl(id, role) {
    var q = { productId: id || '', mode: 'review' };
    if (role === 'qa') q.role = 'qa';
    return qmsHref('Product Master Editor.html', q);
  }

  function testParameterEditorUrl(id) {
    return qmsHref('Test Parameter Editor.html', { productId: id || '' });
  }

  function moaSectionEditorUrl(id) {
    return qmsHref('MOA Section Editor.html', { productId: id || '' });
  }

  function productStatusPillHtml(product) {
    var map = {
      DRAFT: ['pill--draft', 'Draft'],
      SUBMITTED: ['pill--submitted', 'Submitted'],
      QC_APPROVED: ['pill--approved', 'QC approved'],
      QA_SIGNED: ['pill--signed', 'Signed'],
      ISSUED: ['pill--signed', 'Active'],
      REJECTED: ['pill--draft', 'Rejected'],
      SUPERSEDED: ['pill--superseded', 'Superseded']
    };
    var s = map[product.status] || ['pill--draft', product.status];
    return '<span class="pill ' + s[0] + ' pill-sm">' + s[1] + '</span>';
  }

  function formatNowStamp() {
    return 'Today · ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  function updateProductStatus(productId, newStatus, actor, comment) {
    var product = getProductById(productId);
    if (!product) return false;
    var prev = product.status;
    product.status = newStatus;
    var now = formatNowStamp();
    if (newStatus === 'SUBMITTED') {
      product.submittedAt = now;
      if (actor) product.createdBy = actor;
      var sub = getUserDisplay(actor);
      state.notifications.unshift({
        recipientUsername: 'qc.mgr',
        category: 'action',
        titlePrefix: 'Master approval pending:',
        docNo: product.familyCode,
        messageHtml: '<span class="who">' + sub.fullName + '</span> submitted Product Master · ' + product.name,
        timestamp: 'Just now',
        dayGroup: 'Today',
        unread: true,
        route: productReviewUrl(productKey(product))
      });
    }
    if (newStatus === 'QC_APPROVED') {
      product.approvedAt = now;
      if (actor) product.approvedBy = actor;
      var creator = getUserDisplay(product.createdBy);
      state.notifications.unshift({
        recipientUsername: 'qa.mgr',
        category: 'action',
        titlePrefix: 'Master signature required:',
        docNo: product.familyCode,
        messageHtml: '<span class="who">' + getUserDisplay(actor).fullName + ' (QC)</span> approved · ' + product.name + ' awaiting QA signature',
        timestamp: 'Just now',
        dayGroup: 'Today',
        unread: true,
        route: productReviewUrl(productKey(product), 'qa')
      });
      if (product.createdBy) {
        state.notifications.unshift({
          recipientUsername: product.createdBy,
          category: 'info',
          titlePrefix: 'Master QC approved:',
          docNo: product.familyCode,
          messageHtml: product.name + ' approved by QC · forwarded to QA for signature',
          timestamp: 'Just now',
          dayGroup: 'Today',
          unread: true,
          route: productUrl(productKey(product))
        });
      }
    }
    if (newStatus === 'QA_SIGNED') {
      product.signedAt = now;
      if (actor) product.signedBy = actor;
      if (product.createdBy) {
        state.notifications.unshift({
          recipientUsername: product.createdBy,
          category: 'info',
          titlePrefix: 'Master signed:',
          docNo: product.familyCode,
          messageHtml: product.name + ' is now active · Revision ' + String(product.currentRevision).padStart(2, '0'),
          timestamp: 'Just now',
          dayGroup: 'Today',
          unread: true,
          route: productUrl(productKey(product))
        });
      }
    }
    if (newStatus === 'REJECTED') {
      product.rejectionComment = comment || '';
      product.rejectedBy = actor;
      product.rejectedAt = now;
    }
    state.auditLog.unshift({
      evt: 'EVT-' + Date.now(),
      ts: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      tt: new Date().toLocaleTimeString('en-GB'),
      actorUsername: actor || 'system',
      action: newStatus === 'REJECTED' ? 'Reject' : (newStatus === 'QA_SIGNED' ? 'Sign' : (newStatus === 'SUBMITTED' ? 'Submit' : 'Approve')),
      etype: 'Master',
      entity: product.familyCode + ' · Rev ' + String(product.currentRevision).padStart(2, '0'),
      field: 'Status',
      old: prev,
      neu: newStatus,
      comment: comment || '',
      ip: '10.4.2.27',
      geo: 'Captured'
    });
    persistState();
    return true;
  }

  function getProductsForUser(username) {
    if (!username) return [];
    return state.products.filter(function (p) { return p.createdBy === username; });
  }

  function getProductApprovalQueue(currentUser) {
    if (!currentUser) return [];
    return state.products.filter(function (p) {
      return p.status === 'SUBMITTED' && p.createdBy && p.createdBy !== currentUser.username;
    });
  }

  function getPendingProductSignatures() {
    return state.products.filter(function (p) { return p.status === 'QC_APPROVED'; });
  }

  function renderUserProductMasterList(container, products) {
    if (!container) return;
    if (!products.length) {
      container.innerHTML = '<div class="submit-row" style="padding:var(--s4) var(--s5);color:var(--text-muted);font-size:var(--text-sm);">No product masters created by you yet.</div>';
      return;
    }
    container.innerHTML = products.map(function (p) {
      var key = productKey(p);
      return '<div class="submit-row" data-product="' + key + '">' +
        '<div class="info"><div class="top-line"><span class="doc-id">' + p.familyCode + '</span>' +
        productStatusPillHtml(p) + '</div>' +
        '<span class="batch-line">' + p.name + ' · <span class="mono">R-' + String(p.currentRevision).padStart(2, '0') + '</span></span></div>' +
        '<a class="open-link" href="' + productUrl(key) + '">Open</a></div>';
    }).join('');
    container.querySelectorAll('.submit-row[data-product]').forEach(function (row) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        location.href = productUrl(row.getAttribute('data-product'));
      });
    });
  }

  function renderProductApprovalQueueRows(tbody, products) {
    if (!tbody) return;
    if (!products.length) {
      tbody.innerHTML = '<tr><td colspan="5">' + emptyListHtml('No product masters awaiting approval.') + '</td></tr>';
      return;
    }
    tbody.innerHTML = products.map(function (p) {
      var sub = getUserDisplay(p.createdBy);
      var key = productKey(p);
      return '<tr data-product="' + key + '">' +
        '<td class="product-name">' + p.name + '</td>' +
        '<td class="batch-no mono">' + p.familyCode + '</td>' +
        '<td class="submitter">' + sub.fullName + ' <span class="role">· ' + sub.roleShort + '</span></td>' +
        '<td class="submitted-at">' + (p.submittedAt || p.createdAt || '—') + '</td>' +
        '<td class="action"><a class="review-link" href="' + productReviewUrl(key) + '">Review →</a></td></tr>';
    }).join('');
    tbody.querySelectorAll('tr[data-product]').forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        location.href = productReviewUrl(tr.getAttribute('data-product'));
      });
    });
  }

  function renderPendingProductSignatureRows(tbody, products) {
    if (!tbody) return;
    if (!products.length) {
      tbody.innerHTML = '<tr><td colspan="5">' + emptyListHtml('No product masters awaiting signature.') + '</td></tr>';
      return;
    }
    tbody.innerHTML = products.map(function (p) {
      var appr = getUserDisplay(p.approvedBy);
      var key = productKey(p);
      return '<tr data-product="' + key + '">' +
        '<td class="product-name">' + p.name + '</td>' +
        '<td class="batch-no mono">' + p.familyCode + '</td>' +
        '<td class="by">' + appr.fullName + ' <span class="role">· QC Mgr</span></td>' +
        '<td class="at">' + (p.approvedAt || '—') + '</td>' +
        '<td class="action"><span class="link-action">Sign →</span></td></tr>';
    }).join('');
    tbody.querySelectorAll('tr[data-product]').forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', function () {
        location.href = productReviewUrl(tr.getAttribute('data-product'), 'qa');
      });
    });
  }

  function isDualLimitOperator(op) {
    return op === 'BETWEEN' || op === 'RANGE';
  }

  function syncQuantLimitFields(op, cfg) {
    if (!cfg) return;
    var dual = isDualLimitOperator(op);
    var nmt = op === 'NMT';
    var nlt = op === 'NLT';
    if (cfg.minWrap) cfg.minWrap.style.display = (dual || nlt) ? '' : 'none';
    if (cfg.maxWrap) cfg.maxWrap.style.display = (dual || nmt) ? '' : 'none';
    if (cfg.minLabel) cfg.minLabel.textContent = dual ? 'Min' : (nlt ? 'Limit value' : 'Min');
    if (cfg.maxLabel) cfg.maxLabel.textContent = dual ? 'Max' : (nmt ? 'Limit value' : 'Max');
    if (cfg.minInput && !dual && !nlt) cfg.minInput.value = '';
    if (cfg.maxInput && !dual && !nmt) cfg.maxInput.value = '';
  }

  function normalizeQuantTestLimits(test) {
    if (!test || test.type !== 'Quantitative') return test;
    var op = test.operator || '';
    if (op === 'NMT') test.min = null;
    else if (op === 'NLT') test.max = null;
    return test;
  }

  function testCriteriaSummary(test) {
    if (test.type === 'Qualitative') return test.acceptanceCriteria || '—';
    var op = test.operator || '';
    if (isDualLimitOperator(op)) {
      return (test.min != null ? test.min : '') + ' – ' + (test.max != null ? test.max : '') +
        (test.unit ? ' ' + test.unit : '');
    }
    if (op === 'NMT') {
      return op + ' ' + (test.max != null ? test.max : '') + (test.unit ? ' ' + test.unit : '');
    }
    if (op === 'NLT') {
      return op + ' ' + (test.min != null ? test.min : '') + (test.unit ? ' ' + test.unit : '');
    }
    return test.acceptanceCriteria || '—';
  }

  function groupTestParameters(tests) {
    var grouped = {};
    TEST_GROUP_ORDER.forEach(function (g) { grouped[g] = []; });
    (tests || []).forEach(function (t) {
      var g = t.group || 'TESTING_PARAMETERS';
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(t);
    });
    return grouped;
  }

  function countMandatoryTests(tests) {
    return (tests || []).filter(function (t) { return t.isMandatory !== false; }).length;
  }

  function renderTestGroupLabelHtml(group) {
    var label = TEST_GROUP_LABELS[group] || group;
    return '<div class="test-group-label">' + label + '</div>';
  }

  function populateTestParameterList(product) {
    var container = document.getElementById('testParamList');
    if (!container || !product || !product.testParameters) return;
    var grouped = groupTestParameters(product.testParameters);
    var html = '';
    var sortNo = 0;
    var lockSvg = '<svg class="tr-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>';
    var chevSvg = '<svg class="tr-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>';
    var gripSvg = '<span class="grip"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg></span>';
    TEST_GROUP_ORDER.forEach(function (group) {
      var tests = grouped[group];
      if (!tests || !tests.length) return;
      html += renderTestGroupLabelHtml(group);
      tests.forEach(function (t) {
        sortNo++;
        var sort = String(sortNo).padStart(2, '0');
        var badge = t.type === 'Qualitative' ? 'tbadge--qual' : 'tbadge--quant';
        var badgeLabel = t.type === 'Qualitative' ? 'Qual' : 'Quant';
        html += '<div class="test-row">' + gripSvg + '<span class="tr-no">' + sort + '</span><div class="tr-body"><span class="tr-name">' + t.name +
          '</span><span class="tr-meta"><span class="tbadge ' + badge + '">' + badgeLabel + '</span></span></div>' + lockSvg + chevSvg + '</div>';
      });
    });
    container.innerHTML = html;
    var footCount = document.getElementById('testParamCount');
    if (footCount) footCount.textContent = product.testParameters.length + ' tests';
    var phStrong = document.querySelector('.ph-info .strong');
    if (phStrong) phStrong.textContent = String(product.testParameters.length);
  }

  function populateProductMasterEditorContext(product, pageKind) {
    if (!product) return;
    var revPad = String(product.currentRevision).padStart(2, '0');
    var editorUrl = productUrl(productKey(product));
    document.querySelectorAll('.breadcrumb a.crumb[href*="Product Master Editor"]').forEach(function (a) {
      a.href = editorUrl;
      if (a.textContent.indexOf('Revision') === 0) {
        a.textContent = 'Revision ' + revPad;
      } else {
        a.textContent = product.name;
      }
    });
    document.querySelectorAll('.breadcrumb .crumb').forEach(function (c) {
      if (c.textContent === 'Glycine IP') c.textContent = product.name;
      if (c.textContent.indexOf('Revision 03') === 0) c.textContent = 'Revision ' + revPad;
    });
    var title = document.querySelector('.ph-title');
    if (title) {
      if (pageKind === 'moa') {
        title.innerHTML = 'MOA Sections &middot; ' + product.name + ' &middot; <span>Revision ' + revPad + '</span>';
      } else {
        title.innerHTML = 'Test parameters &middot; ' + product.name + ' &middot; <span>Revision ' + revPad + '</span>';
      }
    }
    document.title = 'AC-QMS — ' + (pageKind === 'moa' ? 'MOA Sections' : 'Test parameters') + ' · ' + product.name;
    var returnUrl = productUrl(productKey(product));
    ['saveBtn', 'saveNextBtn', 'discardBtn'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn || btn.dataset.pmReturnWired) return;
      btn.dataset.pmReturnWired = '1';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        location.href = returnUrl;
      });
    });
    document.querySelectorAll('a[href*="Test Parameter Editor"]').forEach(function (a) {
      if (typeof testParameterEditorUrl === 'function') a.href = testParameterEditorUrl(productKey(product));
    });
    document.querySelectorAll('a[href*="MOA Section Editor"]').forEach(function (a) {
      if (typeof moaSectionEditorUrl === 'function') a.href = moaSectionEditorUrl(productKey(product));
    });
  }

  function populateMoaSectionList(product) {
    var container = document.getElementById('moaSectionList');
    if (!container || !product) return;
    var sections = product.moaSections || [];
    if (!sections.length && product.testParameters) {
      sections = product.testParameters.map(function (t) {
        return { testName: t.name, procedure: '' };
      });
    }
    if (!sections.length) return;
    var chevSvg = '<svg class="mr-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>';
    container.innerHTML = sections.map(function (s, i) {
      var complete = !!(s.procedure && String(s.procedure).trim());
      var test = (product.testParameters || []).find(function (t) { return t.name === s.testName; });
      var extLab = test && test.isOutsideLab;
      var sub = complete ? 'Complete' : 'Empty';
      return '<div class="moa-row' + (i === 0 ? ' selected' : '') + '">' +
        '<span class="moa-dot' + (complete ? ' complete' : '') + '"></span>' +
        '<span class="mr-no">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div class="mr-body"><span class="mr-name">' + s.testName + '</span><span class="mr-sub' + (complete ? '' : ' empty') + '">' + sub + '</span></div>' +
        (extLab ? '<span class="mr-ext">Ext lab</span>' : '') + chevSvg + '</div>';
    }).join('');
    var foot = container.parentElement && container.parentElement.querySelector('.lp-foot');
    if (foot) {
      var completeCount = sections.filter(function (s) { return s.procedure && String(s.procedure).trim(); }).length;
      foot.innerHTML = '<span>' + sections.length + ' sections</span>' +
        '<span class="legend"><span class="d complete"></span>' + completeCount + ' complete</span>' +
        '<span class="legend"><span class="d empty"></span>' + (sections.length - completeCount) + ' empty</span>';
    }
    var dhTitle = document.querySelector('.dh-title');
    if (dhTitle && sections[0]) {
      dhTitle.innerHTML = '<span class="no">01 &middot;</span> ' + sections[0].testName;
    }
  }

  function populateGroupedTestCards(product, options) {
    options = options || {};
    var container = options.container || document.getElementById('specTestList') || document.getElementById('reviewTestList') || document.querySelector('.test-list');
    if (!container || !product || !product.testParameters) return;
    var grouped = groupTestParameters(product.testParameters);
    var mandSvg = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>';
    var html = '';
    var sortNo = 0;
    TEST_GROUP_ORDER.forEach(function (group) {
      var tests = grouped[group];
      if (!tests || !tests.length) return;
      html += renderTestGroupLabelHtml(group);
      tests.forEach(function (t) {
        sortNo++;
        var sort = String(sortNo).padStart(2, '0');
        var isQual = t.type === 'Qualitative';
        var badge = isQual ? 'tbadge--qual' : 'tbadge--quant';
        var badgeLabel = isQual ? 'Qualitative' : 'Quantitative · range';
        var crit = testCriteriaSummary(t);
        var locked = t.isMandatory !== false || group !== 'ADDITIONAL_TESTS';
        var lockClass = locked ? ' locked' : '';
        var mand = t.isMandatory !== false ? '<span class="mand">' + mandSvg + 'Mandatory</span>' : '<span class="opt">Optional</span>';
        var toggle = (!locked && options.showOptionalToggle) ? '<label class="opt-toggle"><input type="checkbox" /> Include</label>' : '';
        html += '<div class="test-card' + lockClass + '"><div class="test-head"><div class="tc-left">' +
          '<div class="tc-name-row"><span class="tc-sortno">' + sort + '</span><span class="tc-name">' + t.name + '</span></div>' +
          '<div class="tc-badges"><span class="tbadge ' + badge + '">' + badgeLabel + '</span><span class="pharma">' + (t.pharmacopoeiaTag || product.pharmacopoeia) + '</span></div></div>' +
          '<div class="tc-right"><span class="tc-criteria">' + crit + '</span><div class="tc-controls">' + mand + toggle + '</div></div></div></div>';
      });
    });
    container.innerHTML = html;
  }

  function populateApprovalSpecTable(product) {
    var tbody = document.getElementById('approvalSpecTbody') || document.querySelector('.doc-section .doc-table tbody');
    if (!tbody || !product || !product.testParameters) return;
    var grouped = groupTestParameters(product.testParameters);
    var html = '';
    var sortNo = 0;
    TEST_GROUP_ORDER.forEach(function (group) {
      var tests = grouped[group];
      if (!tests || !tests.length) return;
      html += '<tr class="group-row"><td colspan="5">' + (TEST_GROUP_LABELS[group] || group) + '</td></tr>';
      tests.forEach(function (t) {
        sortNo++;
        var crit = testCriteriaSummary(t);
        html += '<tr><td class="t-no">' + sortNo + '</td><td class="t-name">' + t.name + '</td><td class="t-type">' + t.type +
          '</td><td class="t-pharma">' + (t.pharmacopoeiaTag || product.pharmacopoeia) + '</td><td class="t-crit">' + crit + '</td></tr>';
      });
    });
    tbody.innerHTML = html;
  }

  function populateCoaResultsTable(product) {
    var tbody = document.getElementById('coaResultsTbody') || document.querySelector('.results tbody');
    if (!tbody || !product || !product.testParameters) return;
    var grouped = groupTestParameters(product.testParameters);
    var satPill = '<span class="sat-pill"><svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>Satisfactory</span>';
    var html = '';
    var sortNo = 0;
    TEST_GROUP_ORDER.forEach(function (group) {
      var tests = grouped[group];
      if (!tests || !tests.length) return;
      html += '<tr class="group-row"><td colspan="5">' + (TEST_GROUP_LABELS[group] || group) + '</td></tr>';
      tests.forEach(function (t) {
        sortNo++;
        var crit = testCriteriaSummary(t);
        var obs = t.type === 'Qualitative' ? 'Complies' : (t.name.indexOf('Assay') !== -1 ? '99.2 %' : 'Within limit');
        html += '<tr><td class="sr">' + sortNo + '</td><td class="analysis">' + t.name + '</td><td class="spec">' + crit +
          '</td><td class="obs">' + obs + '</td><td class="concl">' + satPill + '</td></tr>';
      });
    });
    tbody.innerHTML = html;
    var compliance = document.getElementById('coaComplianceCount');
    if (compliance) compliance.textContent = countMandatoryTests(product.testParameters) + ' mandatory tests';
  }

  function populateCreateSpecTestList(doc) {
    if (!doc || doc.type !== 'SPEC') return;
    var product = getProductById(doc.masterCode);
    if (!product) return;
    populateGroupedTestCards(product, {
      container: document.getElementById('specTestList') || document.querySelector('.test-list'),
      showOptionalToggle: true
    });
  }

  function addProduct(product) {
    if (!product || !product.id) return false;
    for (var i = 0; i < state.products.length; i++) {
      if (state.products[i].id === product.id) return false;
    }
    state.products.push(product);
    persistState();
    return true;
  }

  function addBatch(batch) {
    if (!batch || !batch.batchNo) return false;
    for (var i = 0; i < state.batches.length; i++) {
      if (state.batches[i].batchNo === batch.batchNo) return false;
    }
    state.batches.push(batch);
    persistState();
    return true;
  }

  function addDocument(doc) {
    if (!doc || !doc.docNo) return false;
    for (var i = 0; i < state.documents.length; i++) {
      if (state.documents[i].docNo === doc.docNo) return false;
    }
    state.documents.push(doc);
    persistState();
    return true;
  }

  var _MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseMonthInput(val) {
    if (!val) return null;
    var s = String(val).trim();
    var iso = s.match(/^(\d{4})-(\d{2})$/);
    if (iso) return { year: parseInt(iso[1], 10), month: parseInt(iso[2], 10) - 1 };
    var named = s.match(/^([A-Za-z]{3})\s+(\d{4})$/);
    if (named) {
      var idx = -1;
      for (var i = 0; i < _MONTH_SHORT.length; i++) {
        if (_MONTH_SHORT[i].toLowerCase() === named[1].toLowerCase()) { idx = i; break; }
      }
      if (idx >= 0) return { year: parseInt(named[2], 10), month: idx };
    }
    return null;
  }

  function formatMonthYear(date) {
    return _MONTH_SHORT[date.getMonth()] + ' ' + date.getFullYear();
  }

  function formatMfgFromMonthInput(val) {
    var p = parseMonthInput(val);
    if (!p) return '';
    return formatMonthYear(new Date(p.year, p.month, 1));
  }

  function calcExpiryFromMfg(mfgInput, shelfLifeMonths) {
    var p = parseMonthInput(mfgInput);
    if (!p || !shelfLifeMonths) return '';
    var d = new Date(p.year, p.month + parseInt(shelfLifeMonths, 10) - 1, 1);
    return formatMonthYear(d);
  }

  function getNextARN() {
    var year = new Date().getFullYear();
    var max = 0;
    state.batches.forEach(function (b) {
      var m = b.arn && b.arn.match(/^(\d{4})FG(\d{2})$/);
      if (m && parseInt(m[1], 10) === year) {
        var n = parseInt(m[2], 10);
        if (n > max) max = n;
      }
    });
    return year + 'FG' + String(max + 1).padStart(2, '0');
  }

  function getNextSpecDocNo(masterCode) {
    var prefix = 'SPEC/' + masterCode + '/';
    var max = 0;
    state.documents.forEach(function (d) {
      if (d.docNo.indexOf(prefix) === 0) {
        var rev = parseInt(d.docNo.slice(prefix.length), 10);
        if (!isNaN(rev) && rev > max) max = rev;
      }
    });
    return prefix + String(max + 1).padStart(2, '0');
  }

  function isBatchNoTaken(batchNo) {
    return !!getBatch(batchNo);
  }

  function createBatchWithDocuments(batch, product) {
    if (!batch || !product) return { ok: false, error: 'Missing batch or product' };
    if (!addBatch(batch)) return { ok: false, error: 'duplicate' };
    var specDocNo = getNextSpecDocNo(batch.masterCode);
    var docBase = {
      batchNo: batch.batchNo,
      product: batch.product,
      pharmacopoeia: batch.pharmacopoeia,
      masterCode: batch.masterCode,
      submittedAt: null,
      approvedBy: null,
      approvedAt: null,
      signedBy: null,
      signedAt: null,
      rejectReason: null
    };
    addDocument(Object.assign({}, docBase, {
      docNo: specDocNo, type: 'SPEC', status: 'DRAFT', createdBy: batch.assignedQcExec
    }));
    addDocument(Object.assign({}, docBase, {
      docNo: 'MOA/' + batch.masterCode + '/01', type: 'MOA', status: 'PENDING', createdBy: null
    }));
    addDocument(Object.assign({}, docBase, {
      docNo: 'AWS/' + (product.shortCode || batch.masterCode) + '/01',
      type: 'AWS', status: 'PENDING', createdBy: null,
      issuanceStamp: null, testResults: {}
    }));
    addDocument(Object.assign({}, docBase, {
      docNo: batch.coaDocNo, type: 'COA', status: 'DRAFT', createdBy: null
    }));
    return { ok: true, specDocNo: specDocNo };
  }

  function updateDocumentStatus(docNo, newStatus, actor, comment) {
    var doc = getDocument(docNo);
    if (!doc) return false;
    doc.status = newStatus;
    var now = 'Today · ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    if (newStatus === 'SUBMITTED') { doc.submittedAt = now; if (actor) doc.createdBy = actor; }
    if (newStatus === 'QC_APPROVED') { doc.approvedAt = now; if (actor) doc.approvedBy = actor; }
    if (newStatus === 'QA_SIGNED' || newStatus === 'ISSUED') { doc.signedAt = now; if (actor) doc.signedBy = actor; }
    if (newStatus === 'REJECTED' && comment) {
      doc.rejectReason = comment;
      doc.rejectedBy = actor;
      doc.rejectedAt = now;
    }
    if (comment && newStatus !== 'REJECTED') {
      state.auditLog.unshift({
        evt: 'EVT-' + Date.now(), ts: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        tt: new Date().toLocaleTimeString('en-GB'), actorUsername: actor || 'system',
        action: newStatus, etype: 'Document', entity: docNo, field: 'Status', old: '', neu: newStatus,
        comment: comment, ip: '10.4.2.27', geo: 'Captured'
      });
    }
    persistState();
    return true;
  }

  function resetToBaseline() {
    localStorage.removeItem(STATE_KEY);
    state = deepClone(BASELINE);
    persistState();
  }

  function resetToEmpty() {
    state.batches = [];
    state.documents = [];
    state.notifications = [];
    state.auditLog = [];
    state.timelineEvents = {};
    state.products = [];
    persistState();
  }

  function populateProductMaster(product) {
    if (!product) return;
    var pid = productKey(product);
    document.title = 'AC-QMS — Product Master · ' + product.name;
    var revPad = String(product.currentRevision).padStart(2, '0');
    var statusMap = {
      DRAFT: ['pill--draft', 'Draft'],
      SUBMITTED: ['pill--submitted', 'Submitted'],
      QC_APPROVED: ['pill--approved', 'QC approved'],
      QA_SIGNED: ['pill--signed', 'Signed'],
      ISSUED: ['pill--signed', 'Active'],
      REJECTED: ['pill--draft', 'Rejected'],
      SUPERSEDED: ['pill--superseded', 'Superseded']
    };
    var st = statusMap[product.status] || ['pill--draft', product.status];

    var crumbs = document.querySelectorAll('.breadcrumb .crumb');
    if (crumbs.length >= 4) {
      crumbs[2].textContent = product.name;
      if (crumbs[3].classList.contains('current')) {
        crumbs[3].textContent = 'Revision ' + revPad + ' · ' + st[1];
      }
    }
    crumbs.forEach(function (c) {
      if (c.textContent === 'Glycine IP') c.textContent = product.name;
      if (c.classList.contains('current') && c.textContent.indexOf('Revision') === 0) {
        c.textContent = 'Revision ' + revPad + ' · ' + st[1];
      }
    });

    var title = document.querySelector('.pm-title');
    if (title) title.textContent = product.name;
    document.querySelectorAll('.code-badge').forEach(function (badge) {
      var ck = badge.querySelector('.ck');
      if (!ck) return;
      if (ck.textContent === 'Family') badge.innerHTML = '<span class="ck">Family</span>' + product.familyCode;
      if (ck.textContent === 'Short') badge.innerHTML = '<span class="ck">Short</span>' + product.shortCode;
    });
    var pmRev = document.querySelector('.pm-rev');
    if (pmRev) pmRev.textContent = 'Revision ' + revPad;
    var pmPill = document.querySelector('.pm-rev-row .pill');
    if (pmPill) pmPill.outerHTML = '<span class="pill ' + st[0] + '">' + st[1] + '</span>';

    function setField(id, val) {
      var el = document.getElementById(id);
      if (el) el.value = val != null && val !== '' ? val : '';
    }
    function setOptionalField(id, val) {
      var el = document.getElementById(id);
      if (!el) return;
      var field = el.closest('.field');
      var text = val != null && val !== '' ? String(val) : '';
      el.value = text;
      if (field) field.style.display = text ? '' : 'none';
    }
    setField('pname', product.name);
    setField('formula', product.molecularFormula);
    setField('family', product.familyCode);
    setField('mw', product.molecularWeight);
    setField('short', product.shortCode);
    setField('ptag', product.pharmacopoeiaTag || product.regulatoryReference);
    setOptionalField('chemicalName', product.chemicalName);
    setOptionalField('technicalName', product.technicalName);
    setOptionalField('composition', product.composition);
    setOptionalField('originSource', product.originSource);
    setOptionalField('methodOfProduction', product.methodOfProduction);
    setOptionalField('grade', product.gradeCategory);
    setField('storage', product.storageConditions);
    setField('sampling', product.samplingPlan);
    setField('retained', product.retainedSampleQty);
    setField('shelf', product.shelfLifeMonths);
    setField('specialHandling', product.specialHandling);
    setField('packingPrimary', product.primaryPacking);
    setField('packingSecondary', product.secondaryPacking);
    setField('retainedRetention', product.retentionPeriod);

    var regref = document.getElementById('regref');
    if (regref) {
      var phMap = { IP: 0, BP: 1, USP: 2, EP: 3 };
      regref.selectedIndex = phMap[product.pharmacopoeia] != null ? phMap[product.pharmacopoeia] : 0;
    }

    document.querySelectorAll('.tab-rail .tab[href*="Test Parameter"]').forEach(function (a) {
      a.href = testParameterEditorUrl(pid);
    });
    document.querySelectorAll('.tab-rail .tab[href*="MOA Section"]').forEach(function (a) {
      a.href = moaSectionEditorUrl(pid);
    });

    var revLabel = document.querySelector('.rev-menu-label');
    if (revLabel) revLabel.textContent = 'Revision history · ' + product.name;

    var revTbody = document.getElementById('pmRevisionHistoryTbody');
    if (revTbody) renderRevisionHistoryTable(revTbody, product.revisionHistory || [], 'SPEC');
  }

  function getBatchesForQcExec(username) {
    return state.batches.filter(function (b) { return b.assignedQcExec === username; });
  }

  function getActiveBatchCount() {
    return state.batches.filter(function (b) { return b.status !== 'RELEASED'; }).length;
  }

  function getAssignedBatchCount(username) {
    return getBatchesForQcExec(username).length;
  }

  function getApprovalQueue(currentUser) {
    if (!currentUser) return [];
    return state.documents.filter(function (d) {
      return d.status === 'SUBMITTED' && d.createdBy && d.createdBy !== currentUser.username;
    });
  }

  function getPendingSignatures() {
    return state.documents.filter(function (d) { return d.status === 'QC_APPROVED'; });
  }

  function getDraftsForUser(username) {
    return state.documents.filter(function (d) {
      return d.createdBy === username && d.status === 'DRAFT' && d.type !== 'COA';
    });
  }

  function getRejectedForUser(username) {
    return state.documents.filter(function (d) {
      return d.createdBy === username && d.status === 'REJECTED';
    });
  }

  function getRejectionsByApprover(username) {
    return state.documents.filter(function (d) {
      return d.rejectedBy === username && d.rejectReason;
    });
  }

  function renderManagerRejectionList(container, docs) {
    if (!container) return;
    if (!docs.length) {
      container.innerHTML = '<p style="padding:var(--s4) var(--s5);font-size:var(--text-sm);color:var(--text-muted);">No recent rejections.</p>';
      return;
    }
    container.innerHTML = docs.map(function (d) {
      var creator = getUserDisplay(d.createdBy);
      var rework = findReworkDraft(d);
      var statusTag = rework ? 'Back in draft' : 'Rejected';
      var statusCls = rework ? 'status-tag--draft' : 'status-tag--draft';
      return '<div class="rej-row">' +
        '<div class="rej-top"><span class="rej-doc">' + d.docNo + '</span>' +
        '<span class="status-tag ' + statusCls + '">' + statusTag + '</span></div>' +
        '<span class="rej-reason">' + (d.rejectReason || '') + '</span>' +
        '<div class="rej-meta"><span class="batch">' + d.batchNo + '</span><span class="dot"></span>' +
        '<span>' + creator.fullName + '</span><span class="dot"></span>' +
        '<span>' + (d.rejectedAt || '') + ' IST</span></div></div>';
    }).join('');
  }

  function getNotificationsForUser(username) {
    return state.notifications.filter(function (n) { return n.recipientUsername === username; });
  }

  function getAuditLog() {
    return state.auditLog.map(enrichAuditEntry);
  }

  function getReleasedBatches() {
    var released = state.batches.filter(function (b) { return b.status === 'RELEASED'; });
    if (!released.length) return [];
    return released.map(function (b, i) {
      var coa = getDocument(b.coaDocNo);
      return {
        sr: i + 1, batch: b.batchNo, arn: b.arn, product: b.product,
        customer: b.customer, mfg: b.mfgDate, mfgS: '', exp: b.expiryDate, expS: '',
        rel: b.releasedAt || '', relT: b.releasedAtTime || '', relS: '',
        by: getUserDisplay(b.releasedBy || 'qa.mgr').fullName,
        coa: b.coaDocNo, comp: b.complies !== false
      };
    });
  }

  function auditActionToTimelineType(action) {
    var a = String(action || '').toLowerCase();
    if (a.indexOf('sign') !== -1 || a.indexOf('issue') !== -1) return 'sign';
    if (a.indexOf('approve') !== -1) return 'approve';
    if (a.indexOf('reject') !== -1) return 'reject';
    if (a.indexOf('submit') !== -1) return 'submit';
    return 'neutral';
  }

  function getTimelineForDoc(docNo) {
    if (state.timelineEvents[docNo]) return state.timelineEvents[docNo];
    var fromAudit = state.auditLog.filter(function (e) { return e.entity === docNo; }).map(function (e) {
      return {
        type: auditActionToTimelineType(e.action),
        date: e.ts,
        time: e.tt + ' IST',
        actor: e.actorUsername,
        action: e.action + ' ' + (docNo.split('/')[0] || 'document'),
        rev: 'Revision 00',
        note: e.comment || '',
        comment: e.comment || ''
      };
    });
    if (fromAudit.length) return fromAudit;
    var doc = getDocument(docNo);
    if (doc && doc.createdBy) {
      return [{
        type: 'neutral',
        date: doc.submittedAt || '—',
        time: '',
        actor: doc.createdBy,
        action: 'Created ' + doc.type,
        rev: 'Revision 00',
        note: doc.product + ' · Batch ' + doc.batchNo
      }];
    }
    return state.timelineEvents[DEFAULT_DOC] || [];
  }

  function getCoasToIssue() {
    return state.documents.filter(function (d) {
      if (d.type !== 'COA' || d.status !== 'DRAFT') return false;
      var aws = pickBestDocForBatch(d.batchNo, 'AWS');
      return aws && (aws.status === 'QC_APPROVED' || aws.status === 'QA_SIGNED' || aws.status === 'ISSUED');
    });
  }

  function getBatchesForPipelineColumn(column) {
    return state.batches.filter(function (b) { return b.pipelineColumn === column; });
  }

  function docUrl(page, docNo, extra) {
    var url = qmsHref(page, { docNo: docNo });
    if (extra) url += (url.indexOf('?') >= 0 ? '&' : '?') + extra;
    return url;
  }

  function getCoaDocNoForBatch(batchNo) {
    var batch = getBatch(batchNo);
    if (batch && batch.coaDocNo) return batch.coaDocNo;
    for (var i = 0; i < state.documents.length; i++) {
      var d = state.documents[i];
      if (d.batchNo === batchNo && d.type === 'COA') return d.docNo;
    }
    return null;
  }

  function getCoaSignIssueUrl(batchNo) {
    var coaDocNo = getCoaDocNoForBatch(batchNo);
    if (coaDocNo) return docUrl('COA Sign & Issue.html', coaDocNo);
    console.warn('AC-QMS: No COA document found for batch', batchNo);
    return qmsHref('COA Sign & Issue.html');
  }

  function batchUrl(batchNo) {
    return qmsHref('Batch Detail.html', { batchNo: batchNo });
  }

  function phasePillClass(phase) {
    var m = { SPEC: 'pill--spec', MOA: 'pill--moa', AWS: 'pill--aws', COA: 'pill--coa' };
    return m[phase] || 'pill--spec';
  }

  function statusPillHtml(doc) {
    var map = {
      DRAFT: ['pill--draft', 'Draft'],
      PENDING: ['pill--locked', 'Pending'],
      SUBMITTED: ['pill--submitted', 'Submitted'],
      QC_APPROVED: ['pill--approved', 'QC approved'],
      QA_SIGNED: ['pill--signed', 'QA signed'],
      ISSUED: ['pill--signed', 'Issued'],
      REJECTED: ['pill--draft', 'Rejected']
    };
    var s = map[doc.status] || ['pill--draft', doc.status];
    if (doc.type === 'COA' && doc.status === 'DRAFT') return '<span class="pill pill--locked pill-sm">Locked</span>';
    return '<span class="pill ' + s[0] + ' pill-sm">' + s[1] + '</span>';
  }

  function renderQcExecBatchRows(tbody, batches) {
    if (!tbody) return;
    if (!batches.length) {
      tbody.innerHTML = '<tr><td colspan="5">' + emptyListHtml('You have no batches assigned yet. Your QC Manager will assign one when a new batch begins testing.') + '</td></tr>';
      return;
    }
    tbody.innerHTML = batches.map(function (b) {
      return '<tr data-batch="' + b.batchNo + '">' +
        '<td class="batch-no">' + b.batchNo + '</td>' +
        '<td class="arn">' + b.arn + '</td>' +
        '<td class="product">' + b.product + '</td>' +
        '<td><span class="pill ' + phasePillClass(b.currentPhase) + '">' + b.currentPhase + '</span></td>' +
        '<td class="last-activity">' + b.lastActivity + '</td></tr>';
    }).join('');
    tbody.querySelectorAll('tr').forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', function () {
        location.href = batchUrl(tr.getAttribute('data-batch'));
      });
    });
  }

  function renderApprovalQueueRows(tbody, docs) {
    if (!tbody) return;
    tbody.innerHTML = docs.map(function (d) {
      var sub = getUserDisplay(d.createdBy);
      return '<tr data-doc="' + d.docNo + '">' +
        '<td class="doc-no">' + d.docNo + '</td>' +
        '<td><span class="pill ' + phasePillClass(d.type) + '">' + d.type + '</span></td>' +
        '<td class="batch-no">' + d.batchNo + '</td>' +
        '<td class="submitter">' + sub.fullName + ' <span class="role">· ' + sub.roleShort + '</span></td>' +
        '<td class="submitted-at">' + (d.submittedAt || '—') + '</td>' +
        '<td class="action"><a class="review-link" href="' + docUrl('Document Approval Review.html', d.docNo) + '">Review →</a></td></tr>';
    }).join('');
    tbody.querySelectorAll('tr').forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', function () {
        location.href = docUrl('Document Approval Review.html', tr.getAttribute('data-doc'));
      });
    });
  }

  function renderPendingSignatureRows(tbody, docs) {
    if (!tbody) return;
    if (!docs.length) {
      tbody.innerHTML = '<tr><td colspan="6">' + emptyListHtml('Nothing pending right now.') + '</td></tr>';
      return;
    }
    tbody.innerHTML = docs.map(function (d) {
      var appr = getUserDisplay(d.approvedBy);
      return '<tr data-doc="' + d.docNo + '">' +
        '<td class="doc-no">' + d.docNo + '</td>' +
        '<td><span class="pill ' + phasePillClass(d.type) + '">' + d.type + '</span></td>' +
        '<td class="batch-no">' + d.batchNo + '</td>' +
        '<td class="by">' + appr.fullName + ' <span class="role">· QC Mgr</span></td>' +
        '<td class="at">' + (d.approvedAt || '—') + '</td>' +
        '<td class="action"><span class="link-action">Review &amp; sign →</span></td></tr>';
    }).join('');
    tbody.querySelectorAll('tr').forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', function () {
        location.href = docUrl('Document Approval Review.html', tr.getAttribute('data-doc'), 'role=qa');
      });
    });
  }

  function renderSubmitList(container, docs) {
    if (!container) return;
    if (!docs.length) {
      container.innerHTML = '<div class="submit-row" style="padding:var(--s4) var(--s5);color:var(--text-muted);font-size:var(--text-sm);">No document drafts awaiting submission.</div>';
      return;
    }
    container.innerHTML = docs.map(function (d) {
      var openPage = d.type === 'AWS' ? 'AWS Data Entry.html' : 'Create SPEC.html';
      return '<div class="submit-row">' +
        '<div class="info"><div class="top-line"><span class="doc-id">' + d.docNo + '</span><span class="doc-type">' + d.type + '</span></div>' +
        '<span class="batch-line">' + d.product + ' · <span class="mono">' + d.batchNo + '</span></span></div>' +
        '<a class="open-link" href="' + docUrl(openPage, d.docNo) + '">Open</a></div>';
    }).join('');
  }

  function findReworkDraft(rejectedDoc) {
    for (var i = 0; i < state.documents.length; i++) {
      var d = state.documents[i];
      if (d.batchNo === rejectedDoc.batchNo && d.type === rejectedDoc.type &&
          d.status === 'DRAFT' && d.createdBy === rejectedDoc.createdBy) return d;
    }
    return null;
  }

  function renderRejectList(container, docs) {
    if (!container) return;
    container.innerHTML = docs.map(function (d) {
      var rej = getUserDisplay(d.rejectedBy || 'qc.mgr');
      return '<div class="reject-row" data-doc="' + d.docNo + '">' +
        '<div class="top-line"><span class="doc-id">' + d.docNo + '</span><span class="batch">' + d.batchNo + '</span></div>' +
        '<span class="reason">' + (d.rejectReason || '') + '</span>' +
        '<div class="meta"><span class="who">' + rej.fullName + ' · QC Manager</span><span class="dot"></span>' +
        '<span class="time">' + (d.rejectedAt || '') + ' IST</span></div></div>';
    }).join('');
    container.querySelectorAll('.reject-row').forEach(function (row) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', function () {
        var rejected = getDocument(row.getAttribute('data-doc'));
        if (!rejected) return;
        var rework = findReworkDraft(rejected) || rejected;
        var page = rework.type === 'AWS' ? 'AWS Data Entry.html' : 'Create SPEC.html';
        location.href = docUrl(page, rework.docNo);
      });
    });
  }

  function renderCoaIssueList(container, docs) {
    if (!container) return;
    if (!docs.length) {
      container.innerHTML = emptyListHtml('Nothing pending right now.');
      return;
    }
    container.innerHTML = docs.map(function (d) {
      var batch = getBatch(d.batchNo);
      return '<div class="coa-row">' +
        '<div class="coa-info">' +
        '<div class="coa-top"><span class="coa-no">' + d.docNo + '</span><span class="pill pill--coa">COA</span></div>' +
        '<span class="coa-meta">' + d.product + ' · <span class="mono">' + d.batchNo + '</span> · <span class="cust">' +
        (batch ? batch.customer : '') + '</span></span></div>' +
        '<a class="link-action" href="' + docUrl('COA Sign & Issue.html', d.docNo) + '">Open</a></div>';
    }).join('');
  }

  function renderNotificationList(container, notifications) {
    if (!container) return;
    if (!notifications.length) {
      container.innerHTML = emptyListHtml('No notifications.');
      return;
    }
    var html = '';
    var lastDay = '';
    notifications.forEach(function (n) {
      if (n.dayGroup !== lastDay) {
        html += '<span class="day-label">' + n.dayGroup + '</span>';
        lastDay = n.dayGroup;
      }
      var cls = 'n-row ' + (n.unread ? 'unread ' : '') + 'cat-' + n.category;
      html += '<a class="' + cls + '" tabindex="0"' + (n.route ? ' data-route="' + n.route + '"' : '') + '>' +
        '<span class="cat-dot"></span><div class="body">' +
        '<div class="head-line"><span class="title-text">' + n.titlePrefix + ' <span class="doc">' + n.docNo + '</span></span>' +
        '<span class="ts">' + n.timestamp + '</span></div>' +
        '<span class="msg">' + n.messageHtml + '</span></div>' +
        (n.unread ? '<span class="unread-mark" aria-label="Unread"></span>' : '') + '</a>';
    });
    container.innerHTML = html;
    container.querySelectorAll('.n-row[data-route]').forEach(function (row) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', function (e) {
        e.preventDefault();
        location.href = row.getAttribute('data-route');
      });
    });
  }

  function renderBatchPipelineColumn(colBody, batches) {
    if (!colBody) return;
    if (!batches.length) {
      colBody.innerHTML = '<div class="list-empty" style="border:none;padding:var(--s4);font-size:var(--text-xs);">No batches in this stage</div>';
      return;
    }
    colBody.innerHTML = batches.map(function (b) {
      var analyst = getUserDisplay(b.assignedQcExec);
      var docs = getDocumentsForBatch(b.batchNo);
      var steps = ['SPEC', 'MOA', 'AWS', 'COA'];
      var stepper = steps.map(function (t) {
        var doc = docs.filter(function (d) { return d.type === t; })[0];
        var cls = 'locked', dot = 'locked';
        if (doc) {
          if (doc.status === 'QA_SIGNED' || doc.status === 'ISSUED') { cls = 'signed'; dot = 'signed'; }
          else if (t === b.currentPhase) { cls = 'progress'; dot = 'progress'; }
          else if (doc.status === 'PENDING') { cls = 'locked'; dot = 'locked'; }
          else if (doc.status !== 'DRAFT') { cls = 'signed'; dot = 'signed'; }
        }
        return '<div class="step ' + cls + '"><span class="dot ' + dot + '"></span><span class="lbl">' + t + '</span></div>';
      }).join('');
      var cust = b.customer === 'In-house (captive)' ? '<span class="bc-customer none">In-house</span>' : '<span class="bc-customer">' + b.customer + '</span>';
      return '<article class="batch-card" data-batch="' + b.batchNo + '">' +
        '<div class="bc-head"><div class="bc-ids"><span class="bc-batch">' + b.batchNo + '</span><span class="bc-arn">' + b.arn + '</span></div></div>' +
        '<div class="bc-product">' + b.product + '</div><div class="stepper">' + stepper + '</div>' +
        '<div class="bc-foot">' + cust + '<span class="bc-analyst" title="' + analyst.fullName + '">' + analyst.initials + '</span></div></article>';
    }).join('');
    colBody.querySelectorAll('.batch-card').forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        location.href = batchUrl(card.getAttribute('data-batch'));
      });
    });
  }

  function populateBatchDetail(batch) {
    batch = batch || getBatchFromUrl();
    if (!batch) return;
    document.title = 'AC-QMS — Batch detail · ' + batch.batchNo;
    var docs = getDocumentsForBatch(batch.batchNo);
    var docMap = {};
    docs.forEach(function (d) { docMap[d.type] = d; });

    var setText = function (sel, txt) {
      var el = document.querySelector(sel);
      if (el) el.textContent = txt;
    };
    setText('.bh-batch', batch.batchNo);
    setText('.bh-arn .v, .bh-arn', batch.arn);
    var arnEl = document.querySelector('.bh-arn');
    if (arnEl) arnEl.innerHTML = '<span class="k">ARN</span>' + batch.arn;
    setText('.bh-product', batch.product);
    var dates = document.querySelectorAll('.bh-date .v');
    if (dates[0]) dates[0].textContent = batch.mfgDate;
    if (dates[1]) dates[1].textContent = batch.expiryDate;
    var crumb = document.querySelector('.breadcrumb .crumb.current.mono, .breadcrumb .crumb.mono');
    if (crumb) crumb.textContent = batch.batchNo;
    var metaCustomer = document.querySelector('.meta-row .meta-v');
    document.querySelectorAll('.meta-row').forEach(function (row) {
      var k = row.querySelector('.meta-k');
      if (k && k.textContent.trim() === 'Customer') row.querySelector('.meta-v').textContent = batch.customer;
    });
    var analyst = getUserDisplay(batch.assignedQcExec);
    var metaAnalyst = document.querySelector('.meta-analyst .nm');
    if (metaAnalyst) metaAnalyst.innerHTML = analyst.fullName + ' <span class="dept-badge dept-badge--qc">QC</span>';
    var metaAvatar = document.querySelector('.meta-analyst .avatar');
    if (metaAvatar) metaAvatar.textContent = analyst.initials;

    var tsteps = document.querySelectorAll('.tracker .tstep');
    var types = ['SPEC', 'MOA', 'AWS', 'COA'];
    tsteps.forEach(function (step, i) {
      var doc = docMap[types[i]];
      if (!doc) return;
      var docEl = step.querySelector('.tstep-doc');
      if (docEl) docEl.textContent = doc.docNo;
      var pill = step.querySelector('.tstep-title .pill');
      if (pill) pill.outerHTML = statusPillHtml(doc);
    });

    var cards = document.querySelectorAll('.doc-card');
    cards.forEach(function (card, i) {
      var doc = docMap[types[i]];
      if (!doc) return;
      var noEl = card.querySelector('.doc-no');
      if (noEl) noEl.textContent = doc.docNo;
      var pillEl = card.querySelector('.doc-row1 .pill');
      if (pillEl) pillEl.outerHTML = statusPillHtml(doc);
      var actionEl = card.querySelector('.doc-action');
      if (actionEl && doc.status !== 'DRAFT') {
        var actor = doc.signedBy ? getUserDisplay(doc.signedBy) : getUserDisplay(doc.createdBy);
        var label = doc.signedBy ? 'Signed by ' + actor.fullName : (doc.status === 'SUBMITTED' ? 'Submitted by ' + actor.fullName : 'Approved by ' + getUserDisplay(doc.approvedBy).fullName);
        var when = doc.signedAt || doc.submittedAt || doc.approvedAt || '';
        actionEl.innerHTML = '<span class="who">' + label + '</span>' + (when ? ' · ' + when : '');
        if (doc.status === 'SUBMITTED') actionEl.innerHTML += ' · awaiting your approval';
      }
      var tl = card.querySelector('.timeline-link');
      if (tl) tl.href = docUrl('Document Timeline.html', doc.docNo);
      var open = card.querySelector('.open-link');
      if (open) {
        var pages = { SPEC: 'Create SPEC.html', MOA: 'MOA Section Editor.html', AWS: 'AWS Data Entry.html', COA: 'COA Sign & Issue.html' };
        open.href = docUrl(pages[doc.type] || 'Create SPEC.html', doc.docNo);
      }
    });
    var auditLog = document.querySelector('.card-header .link[href*="Timeline"], .card-header a.link');
    if (auditLog) {
      var specDoc = docMap.SPEC;
      if (specDoc) auditLog.href = docUrl('Document Timeline.html', specDoc.docNo);
    }
  }

  function getRevisionHistoryColLabel(docType) {
    if (docType === 'SPEC') return 'Specification No.';
    if (docType === 'MOA') return 'MOA No.';
    if (docType === 'AWS') return 'AWS No.';
    if (docType === 'COA') return 'COA No.';
    return 'Document No.';
  }

  function getDocumentRevisionHistory(doc) {
    if (!doc) return [];
    if (doc.revisionHistory && doc.revisionHistory.length) return doc.revisionHistory;
    var product = getProductById(doc.masterCode);
    if (product && product.revisionHistory) return product.revisionHistory;
    return [];
  }

  function getSupersedesDisplay(doc) {
    if (!doc || !doc.supersedes) return '\u2014 (first issue)';
    return doc.supersedes;
  }

  function renderRevisionHistoryTable(tbody, rows, docType) {
    if (!tbody) return;
    var colLabel = getRevisionHistoryColLabel(docType);
    var table = tbody.closest('table');
    if (table) {
      var th = table.querySelector('thead th');
      if (th) th.textContent = colLabel;
    }
    if (!rows || !rows.length) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:var(--s3);color:var(--text-muted);font-size:var(--text-xs);">No revision history.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (row) {
      return '<tr>' +
        '<td class="rev-doc-no">' + row.docNo + '</td>' +
        '<td class="rev-made">' + row.revisionMade + '</td>' +
        '<td class="rev-cc">' + row.refCcNo + '</td>' +
        '<td class="rev-date">' + row.effectiveDate + '</td>' +
        '</tr>';
    }).join('');
  }

  function formatAwsRefSpecMoa(batch, product) {
    var code = (product && product.familyCode) || (batch && batch.masterCode) || 'FG00038';
    var ph = (product && product.pharmacopoeia) || (batch && batch.pharmacopoeia) || 'IP';
    return 'SPEC/' + code + '/01 (' + ph + ')  MOA/' + code + '/01 (' + ph + ')';
  }

  function getAwsCompletionDate(doc) {
    if (!doc) return '\u2014';
    if (doc.signedAt && (doc.status === 'QA_SIGNED' || doc.status === 'ISSUED')) return doc.signedAt;
    return '\u2014';
  }

  function formatBatchQty(val, unit) {
    if (val == null || val === '') return '\u2014';
    return String(val) + (unit ? ' ' + unit : '');
  }

  function populateAwsSecondaryHeader(doc, batch) {
    var el = document.getElementById('awsSecondaryHeader');
    if (!el || !doc || !batch) return;
    var product = getProductById(doc.masterCode);
    var fields = {
      awsMfgDate: batch.mfgDate || '\u2014',
      awsExpDate: batch.expiryDate || '\u2014',
      awsTrsNo: batch.testRequestSheet || '\u2014',
      awsArn: batch.arn || '\u2014',
      awsBatchSize: formatBatchQty(batch.batchSize, batch.batchSizeUnit),
      awsQtySampled: formatBatchQty(batch.quantitySampled, batch.quantitySampledUnit),
      awsReceivedDate: batch.receivedDate || '\u2014',
      awsTestingDate: batch.testingDate || '\u2014',
      awsRefSpecMoa: formatAwsRefSpecMoa(batch, product),
      awsCompletionDate: getAwsCompletionDate(doc)
    };
    Object.keys(fields).forEach(function (id) {
      var node = document.getElementById(id);
      if (node) node.textContent = fields[id];
    });
  }

  function populateCoaStorageFooter(product) {
    var textEl = document.getElementById('coaStorageText');
    if (!textEl) return;
    textEl.textContent = (product && product.storageConditions) ? product.storageConditions : '\u2014';
  }

  function populateDocumentContext(doc) {
    doc = doc || getDocFromUrl();
    if (!doc) return;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;
    document.title = 'AC-QMS — ' + doc.docNo;
    var creator = getUserDisplay(doc.createdBy);

    document.querySelectorAll('.ah-doc, .sb-doc').forEach(function (el) { el.textContent = doc.docNo; });
    document.querySelectorAll('.ah-context').forEach(function (el) {
      el.innerHTML = '<span>Batch</span><span class="mono">' + doc.batchNo + '</span><span class="sep">·</span><span>' + doc.product + '</span><span class="sep">·</span><span>Submitted by <span class="who">' + creator.fullName + '</span> · ' + creator.designation + '</span><span class="sep">·</span><span>' + (doc.submittedAt || '2 h ago') + '</span>';
    });
    document.querySelectorAll('.sb-sub').forEach(function (el) {
      el.textContent = 'Timeline of all events · ' + doc.product + ' · Batch ' + doc.batchNo;
    });
    document.querySelectorAll('.breadcrumb .crumb.mono').forEach(function (el) {
      if (el.textContent.indexOf('/') !== -1 && el.textContent.indexOf('SPEC') === 0 || el.textContent.indexOf('MOA') === 0 || el.textContent.indexOf('AWS') === 0 || el.textContent.indexOf('COA') === 0) el.textContent = doc.docNo;
    });
    var titleDoc = document.querySelector('.title .doc');
    if (titleDoc) titleDoc.textContent = doc.docNo;
  }

  function populateCoaDetail(doc) {
    var param = new URLSearchParams(location.search).get('docNo');
    doc = doc || (param ? getDocument(param) : getDocument('COA/GCN/010526'));
    if (!doc) return;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;
    var preparer = getUserDisplay(doc.createdBy || batch.assignedQcExec);
    document.title = 'AC-QMS — COA sign & issue · ' + doc.docNo;
    document.querySelectorAll('.ch-doc, .pm-docno').forEach(function (el) {
      if (el) el.textContent = (el.classList.contains('pm-docno') ? doc.docNo + ' · Page 1 of 1' : doc.docNo);
    });
    var ctx = document.querySelector('.ah-context, .coa-context');
    if (ctx) ctx.innerHTML = '<span>Batch</span><span class="mono">' + batch.batchNo + '</span><span class="sep">·</span><span>' + batch.product + '</span><span class="sep">·</span><span>Customer: <span class="cust">' + batch.customer + '</span></span>';
    document.querySelectorAll('.id-cell').forEach(function (cell) {
      var k = cell.querySelector('.k');
      var v = cell.querySelector('.v');
      if (!k || !v) return;
      if (k.textContent === 'Product') v.textContent = batch.product;
      if (k.textContent === 'Batch no.') v.textContent = batch.batchNo;
    });
    var sigName = document.querySelector('.sig-col .sig-name');
    if (sigName) sigName.textContent = preparer.fullName;
    var sigDesig = document.querySelector('.sig-col .sig-desig');
    if (sigDesig) sigDesig.textContent = preparer.designation.replace('QC ', 'Executive — QC').replace('QA ', 'Manager — QA');
    document.querySelectorAll('.breadcrumb .crumb.mono').forEach(function (el) {
      if (el.textContent.indexOf('COA') === 0 || el.getAttribute('href')) el.textContent = doc.docNo;
    });
    var batchCrumb = document.querySelector('.breadcrumb a.crumb.mono');
    if (batchCrumb) {
      batchCrumb.textContent = batch.batchNo;
      batchCrumb.href = batchUrl(batch.batchNo);
    }
    var batchDocs = getDocumentsForBatch(doc.batchNo);
    var docByType = {};
    batchDocs.forEach(function (d) { docByType[d.type] = d; });
    function setCrossLink(link, href, label) {
      if (!link) return;
      link.href = href;
      var ico = link.querySelector('.ico');
      link.textContent = '';
      if (ico) link.appendChild(ico);
      link.appendChild(document.createTextNode(label));
    }
    var clLinks = document.querySelectorAll('.crosslinks .cl-link');
    var awsD = docByType.AWS || pickBestDocForBatch(doc.batchNo, 'AWS');
    var moaD = docByType.MOA || pickBestDocForBatch(doc.batchNo, 'MOA');
    var specD = docByType.SPEC || pickBestDocForBatch(doc.batchNo, 'SPEC');
    if (awsD) setCrossLink(clLinks[0], docUrl('Document Timeline.html', awsD.docNo), awsD.docNo);
    if (moaD) setCrossLink(clLinks[1], docUrl('Document Timeline.html', moaD.docNo), moaD.docNo);
    if (specD) setCrossLink(clLinks[2], docUrl('Document Timeline.html', specD.docNo), specD.docNo);
    setCrossLink(clLinks[3], productUrl(doc.masterCode), 'Product Master · ' + doc.masterCode + ' · Revision ' + String((getProductById(doc.masterCode) || {}).currentRevision || 2).padStart(2, '0'));
    setCrossLink(clLinks[4], batchUrl(doc.batchNo), 'Batch summary');
    var product = getProductById(doc.masterCode);
    if (product) populateCoaResultsTable(product);
    populateCoaStorageFooter(product);
    var revTbody = document.getElementById('coaRevisionHistoryTbody');
    if (revTbody) renderRevisionHistoryTable(revTbody, getDocumentRevisionHistory(doc), doc.type);
  }

  function populateApprovalReview(doc) {
    doc = doc || getDocFromUrl();
    if (!doc) return;
    populateDocumentContext(doc);
    document.title = 'AC-QMS — Approval review · ' + doc.docNo;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;

    var line = document.querySelector('.ah-doc-line');
    if (line) {
      var ahDoc = line.querySelector('.ah-doc');
      line.querySelectorAll('.pill').forEach(function (p) { p.remove(); });
      if (ahDoc) {
        ahDoc.textContent = doc.docNo;
        ahDoc.insertAdjacentHTML('afterend',
          '<span class="pill ' + phasePillClass(doc.type) + '">' + doc.type + '</span>' + statusPillHtml(doc));
      }
    }

    var titles = {
      SPEC: 'Finished-product specification',
      MOA: 'Method of analysis worksheet',
      AWS: 'Analytical worksheet summary',
      COA: 'Certificate of analysis'
    };
    var dtName = document.querySelector('.document .dt-name');
    if (dtName) dtName.textContent = titles[doc.type] || doc.type;
    var dtSub = document.querySelector('.document .dt-sub');
    if (dtSub) dtSub.textContent = batch.product + ' — for batch ' + batch.batchNo;
    var dtDocNo = document.querySelector('.document .dt-doc-no');
    if (dtDocNo) dtDocNo.innerHTML = doc.docNo + '<br />Revision 00';

    document.querySelectorAll('.document .id-grid .id-cell').forEach(function (cell) {
      var k = cell.querySelector('.k');
      var v = cell.querySelector('.v');
      if (!k || !v) return;
      if (k.textContent === 'Product') v.textContent = batch.product;
      if (k.textContent === 'Master code') v.textContent = doc.masterCode;
      if (k.textContent === 'Pharmacopoeia') v.textContent = doc.pharmacopoeia || batch.pharmacopoeia;
      if (k.textContent === 'Batch') v.textContent = batch.batchNo;
      if (k.textContent === 'ARN') v.textContent = batch.arn;
      if (k.textContent === 'Supersedes') v.textContent = getSupersedesDisplay(doc);
    });

    var sections = document.querySelectorAll('.document .doc-section');
    if (doc.type !== 'SPEC' && sections.length) {
      sections.forEach(function (s, idx) {
        if (idx > 0) s.style.display = 'none';
        else s.style.display = '';
      });
      var secTitle = sections[0].querySelector('.sec-title .t');
      if (secTitle) secTitle.textContent = doc.type === 'AWS' ? 'Test results summary' : 'Document summary';
      var table = sections[0].querySelector('.doc-table');
      if (table) {
        var creator = getUserDisplay(doc.createdBy);
        var appr = doc.approvedBy ? getUserDisplay(doc.approvedBy) : null;
        var summary = doc.type + ' record <span style="font-family:var(--font-mono)">' + doc.docNo +
          '</span> for ' + batch.product + ' · Batch <span style="font-family:var(--font-mono)">' + batch.batchNo +
          '</span>. Prepared by ' + creator.fullName + '.';
        if (appr) summary += ' QC approved by ' + appr.fullName + (doc.approvedAt ? ' · ' + doc.approvedAt : '') + '.';
        table.outerHTML = '<p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;padding:var(--s4)">' + summary + '</p>';
      }
    } else if (sections.length) {
      sections.forEach(function (s) { s.style.display = ''; });
    }

    var src = document.querySelector('.source-link');
    if (src) {
      src.href = productUrl(doc.masterCode);
      src.setAttribute('title', 'Product Master ' + doc.masterCode);
    }
    if (doc.type === 'SPEC') {
      var product = getProductById(doc.masterCode);
      if (product) populateApprovalSpecTable(product);
    }
    var revSection = document.getElementById('revisionHistorySection');
    var revTbody = document.getElementById('revisionHistoryTbody');
    if (revSection) revSection.style.display = '';
    if (revTbody) renderRevisionHistoryTable(revTbody, getDocumentRevisionHistory(doc), doc.type);
  }

  function populateCreateSpecFromProduct(doc) {
    if (!doc || doc.type !== 'SPEC') return;
    populateCreateSpecTestList(doc);
  }

  function populateCreateSpec(doc) {
    doc = doc || getDocFromUrl();
    if (!doc) return;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;
    document.title = 'AC-QMS — Create SPEC · ' + doc.docNo;
    var foot = document.querySelector('.rail-foot');
    if (foot) foot.innerHTML = 'Submission and signature happen on the Review step. SPEC will be numbered <span style="font-family:var(--font-mono);">' + doc.docNo + '</span> on submit.';
    document.querySelectorAll('.wizard-head .batch, .wh-title .batch').forEach(function (el) {
      el.textContent = batch.batchNo;
    });
    var stepLinks = document.querySelectorAll('.steps .step-i[href="Create SPEC.html"]');
    stepLinks.forEach(function (a) {
      a.href = docUrl('Create SPEC.html', doc.docNo);
    });
    populateCreateSpecFromProduct(doc);
    var product = getProductById(doc.masterCode);
    if (product) {
      var activeEl = document.getElementById('activeCount');
      if (activeEl) activeEl.textContent = String(product.testParameters.length);
      var mandEl = document.querySelector('.sum-detail b');
      if (mandEl) mandEl.textContent = String(countMandatoryTests(product.testParameters));
    }
  }

  function setReviewKv(label, value) {
    var key = String(label || '').trim().toLowerCase();
    document.querySelectorAll('.kv .k').forEach(function (k) {
      if (k.textContent.trim().toLowerCase() !== key) return;
      var v = k.nextElementSibling;
      if (v && v.classList.contains('v')) v.textContent = (value != null && value !== '') ? value : '—';
    });
  }

  function populateCreateSpecReview(doc) {
    doc = doc || getDocFromUrl();
    if (!doc) return;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;
    document.title = 'AC-QMS — Create SPEC · Review · ' + doc.docNo;
    document.querySelectorAll('.wizard-head .batch, .wh-title .batch').forEach(function (el) {
      el.textContent = batch.batchNo;
    });
    document.querySelectorAll('.breadcrumb .crumb.mono').forEach(function (el) {
      if (el.textContent.indexOf('/') !== -1) el.textContent = batch.batchNo;
    });
    var reviewDoc = document.querySelector('.review-doc-no, .rv-doc');
    if (reviewDoc) reviewDoc.textContent = doc.docNo;
    var productLine = document.querySelector('.rv-product, .review-product');
    if (productLine) productLine.textContent = batch.product + ' · ' + batch.pharmacopoeia;
    document.querySelectorAll('.rsection .edit-link[href*="Create SPEC"]').forEach(function (a) {
      a.href = docUrl('Create SPEC.html', doc.docNo);
    });
    document.querySelectorAll('.steps .step-i[href*="Create SPEC"]').forEach(function (a) {
      a.href = docUrl('Create SPEC.html', doc.docNo);
    });
    var saveDraft = document.getElementById('saveDraftBtn');
    if (saveDraft) saveDraft.onclick = function () {
      location.href = docUrl('Create SPEC.html', doc.docNo);
    };
    var product = getProductById(doc.masterCode);
    setReviewKv('Product', batch.product);
    setReviewKv('Family code', doc.masterCode);
    if (product) {
      setReviewKv('Short code', product.shortCode);
      setReviewKv('Regulatory reference', product.pharmacopoeiaTag || product.regulatoryReference);
      setReviewKv('Shelf life', product.shelfLifeMonths ? product.shelfLifeMonths + ' months' : '—');
      setReviewKv('Storage conditions', product.storageConditions);
      setReviewKv('Sampling plan', product.samplingPlan);
      populateGroupedTestCards(product, { container: document.getElementById('reviewTestList') });
      var reviewCount = document.getElementById('reviewTestCount');
      if (reviewCount) reviewCount.textContent = String(product.testParameters.length);
      var testsFoot = document.querySelector('.tests-foot span:last-child');
      if (testsFoot) {
        testsFoot.textContent = 'Acceptance criteria inherited from Product Master ' + product.familyCode +
          ' — Revision ' + String(product.currentRevision).padStart(2, '0') + '.';
      }
    }
    setReviewKv('Customer name', batch.customer || '—');
    var docnumValue = document.querySelector('.docnum-value');
    if (docnumValue) docnumValue.textContent = doc.docNo;
    var docnumSub = document.querySelector('.docnum-sub');
    if (docnumSub) docnumSub.textContent = 'Assigned on submission — this number is generated automatically and cannot be edited.';
  }

  function formatSignTimestamp(iso) {
    if (!iso) return '—';
    try {
      var d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return iso; }
  }

  function formatIssuanceStampDisplay(stamp) {
    if (!stamp || !stamp.issuedByName) return '';
    return 'Issued by ' + stamp.issuedByName + ' · ' + formatSignTimestamp(stamp.issuedAt) +
      (stamp.issuedAtLocation ? ' · ' + stamp.issuedAtLocation : '');
  }

  function getAwsPendingIssuance() {
    return state.documents.filter(function (d) {
      return d.type === 'AWS' && !d.issuanceStamp;
    });
  }

  function awsAllTestsSigned(doc) {
    if (!doc || !doc.issuanceStamp || !doc.testResults) return false;
    return AWS_TEST_KEYS.every(function (key) {
      var tr = doc.testResults[key];
      return tr && tr.analyzedBy && tr.checkedBy;
    });
  }

  function canUserCheckAwsTest(doc, testKey, user) {
    if (!user || user.department !== 'QC') return false;
    if (!doc || !doc.issuanceStamp || !doc.testResults) return false;
    var tr = doc.testResults[testKey];
    if (!tr || !tr.analyzedBy || tr.checkedBy) return false;
    return user.username !== tr.analyzedBy.username;
  }

  function issueAwsProtocol(docNo, user) {
    if (!user || user.role !== 'QA_MGR') return false;
    var doc = getDocument(docNo);
    if (!doc || doc.type !== 'AWS' || doc.issuanceStamp) return false;
    doc.issuanceStamp = {
      issuedBy: user.username,
      issuedByName: user.fullName,
      issuedAt: new Date().toISOString(),
      issuedAtLocation: 'AC Ahmedabad QA Office'
    };
    state.auditLog.unshift({
      evt: 'EVT-' + Date.now(),
      ts: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      tt: new Date().toLocaleTimeString('en-GB'),
      actorUsername: user.username,
      action: 'Issue', etype: 'Document', entity: docNo,
      field: 'Issuance Stamp', old: '', neu: 'Issued',
      comment: 'AWS protocol issued to QC for data entry', ip: '10.4.2.51', geo: 'Captured'
    });
    persistState();
    return true;
  }

  function signAwsTestAnalyzed(docNo, testKey, user) {
    var doc = getDocument(docNo);
    if (!doc || doc.type !== 'AWS' || !doc.issuanceStamp) return false;
    var batch = getBatch(doc.batchNo);
    if (!batch || !user || user.username !== batch.assignedQcExec) return false;
    if (AWS_TEST_KEYS.indexOf(testKey) === -1) return false;
    if (!doc.testResults) doc.testResults = {};
    if (!doc.testResults[testKey]) doc.testResults[testKey] = { analyzedBy: null, checkedBy: null };
    if (doc.testResults[testKey].analyzedBy) return false;
    doc.testResults[testKey].analyzedBy = makeSignRecord(user, 'AC Ahmedabad QC Lab');
    persistState();
    return true;
  }

  function signAwsTestChecked(docNo, testKey, user) {
    var doc = getDocument(docNo);
    if (!doc || !canUserCheckAwsTest(doc, testKey, user)) return false;
    doc.testResults[testKey].checkedBy = makeSignRecord(user, 'AC Ahmedabad QC Lab');
    persistState();
    return true;
  }

  function applyAwsIssuanceGate(doc, user, batch) {
    var row = document.getElementById('issuanceRow');
    var paneLeft = document.getElementById('paneLeft');
    var submitBar = document.querySelector('.submit-bar');
    var submitBtn = document.getElementById('submitBtn');
    var result = { mode: 'issued', locked: false };

    if (!row) return result;

    row.innerHTML = '';
    row.className = 'issuance-strip';
    row.hidden = false;

    if (doc.issuanceStamp) {
      row.classList.add('issuance-strip--issued');
      row.textContent = formatIssuanceStampDisplay(doc.issuanceStamp);
    } else {
      var isAssignee = user && batch && user.username === batch.assignedQcExec;
      if (user && user.username === 'qa.mgr') {
        row.classList.add('issuance-strip--action');
        row.innerHTML = '<span class="issuance-msg">AWS protocol awaiting QA issuance stamp.</span>' +
          '<button type="button" class="btn btn--primary btn--sm" id="issueProtocolBtn">Issue Protocol \u2192</button>';
        var btn = document.getElementById('issueProtocolBtn');
        if (btn && typeof signModalUrl === 'function') {
          btn.onclick = function () {
            location.href = signModalUrl('QA Manager Dashboard.html', 'Issue AWS Protocol \u2014 ' + doc.docNo, {
              signType: 'issueAws', docNo: doc.docNo
            });
          };
        }
        result.mode = 'action';
        result.locked = true;
      } else if (isAssignee) {
        row.classList.add('issuance-strip--warn');
        row.textContent = 'This AWS protocol has not been issued by QA. Data entry is locked until QA issues the protocol.';
        result.mode = 'warn';
        result.locked = true;
        if (submitBtn) submitBtn.style.display = 'none';
      } else {
        row.classList.add('issuance-strip--neutral');
        row.textContent = 'Awaiting QA issuance stamp before QC data entry can begin.';
        result.mode = 'neutral';
        result.locked = true;
      }
    }

    if (paneLeft) paneLeft.classList.toggle('aws-body--locked', result.locked);
    if (submitBar) submitBar.classList.toggle('aws-body--locked', result.locked);
    return result;
  }

  function renderAwsTestSignatures(doc, user, batch, gate) {
    var issued = !!(doc && doc.issuanceStamp);
    var isAssignee = user && batch && user.username === batch.assignedQcExec;
    var locked = gate && gate.locked;

    AWS_TEST_KEYS.forEach(function (testKey) {
      var section = document.querySelector('.section[data-id="' + testKey + '"]');
      if (!section) return;
      var existing = section.querySelector('.aws-sig-row');
      if (existing) existing.remove();

      var tr = (doc.testResults && doc.testResults[testKey]) || { analyzedBy: null, checkedBy: null };
      var testName = AWS_TEST_LABELS[testKey] || testKey;
      var row = document.createElement('div');
      row.className = 'aws-sig-row';

      var analyzedHtml;
      if (tr.analyzedBy) {
        analyzedHtml = '<span class="sig-name">' + tr.analyzedBy.fullName + '</span>' +
          '<span class="sig-when">' + formatSignTimestamp(tr.analyzedBy.signedAt) + '</span>';
      } else if (!locked && issued && isAssignee) {
        analyzedHtml = '<button type="button" class="btn btn--neutral btn--xs aws-analyze-btn" data-test-key="' + testKey + '">Mark as analyzed \u2192</button>';
      } else {
        analyzedHtml = '<span class="sig-pending">\u2014</span>';
      }

      var checkedHtml;
      if (tr.checkedBy) {
        checkedHtml = '<span class="sig-name">' + tr.checkedBy.fullName + '</span>' +
          '<span class="sig-when">' + formatSignTimestamp(tr.checkedBy.signedAt) + '</span>';
      } else if (!locked && issued && canUserCheckAwsTest(doc, testKey, user)) {
        checkedHtml = '<button type="button" class="btn btn--neutral btn--xs aws-check-btn" data-test-key="' + testKey + '">Sign as checker \u2192</button>';
      } else {
        checkedHtml = '<span class="sig-pending">\u2014</span>';
      }

      row.innerHTML =
        '<div class="aws-sig-col"><span class="aws-sig-label">Analyzed By</span><div class="aws-sig-val">' + analyzedHtml + '</div></div>' +
        '<div class="aws-sig-col"><span class="aws-sig-label">Checked By</span><div class="aws-sig-val">' + checkedHtml + '</div></div>';
      section.appendChild(row);

      var analyzeBtn = row.querySelector('.aws-analyze-btn');
      if (analyzeBtn && typeof signModalUrl === 'function') {
        analyzeBtn.onclick = function () {
          var next = docUrl('AWS Data Entry.html', doc.docNo);
          location.href = signModalUrl(next, 'Sign as Analyzer \u2014 ' + testName, {
            signType: 'awsAnalyze', docNo: doc.docNo, testKey: testKey
          });
        };
      }
      var checkBtn = row.querySelector('.aws-check-btn');
      if (checkBtn && typeof signModalUrl === 'function') {
        checkBtn.onclick = function () {
          var next = docUrl('AWS Data Entry.html', doc.docNo);
          location.href = signModalUrl(next, 'Sign as Checker \u2014 ' + testName, {
            signType: 'awsCheck', docNo: doc.docNo, testKey: testKey
          });
        };
      }
    });
  }

  function refreshAwsSubmitState(doc) {
    var submitBtn = document.getElementById('submitBtn');
    if (!submitBtn || submitBtn.style.display === 'none') return;
    var ready = awsAllTestsSigned(doc);
    submitBtn.disabled = !ready;
    submitBtn.title = ready ? '' : 'All tests require Analyzed By and Checked By signatures before submission.';
  }

  function renderAwsPendingIssuanceRows(tbody, docs) {
    if (!tbody) return;
    if (!docs || !docs.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:var(--s4);color:var(--text-muted);font-size:var(--text-xs);">No AWS protocols pending issuance.</td></tr>';
      return;
    }
    tbody.innerHTML = docs.map(function (doc) {
      var batch = getBatch(doc.batchNo);
      var analyst = batch ? getUserDisplay(batch.assignedQcExec) : { fullName: '\u2014' };
      return '<tr>' +
        '<td class="doc-no">' + doc.docNo + '</td>' +
        '<td>' + (doc.product || '\u2014') + '</td>' +
        '<td class="batch-no">' + doc.batchNo + '</td>' +
        '<td class="by">' + analyst.fullName + '</td>' +
        '<td class="action"><a class="link-action" href="' + docUrl('AWS Data Entry.html', doc.docNo) + '">Issue \u2192</a></td>' +
        '</tr>';
    }).join('');
  }

  function getAwsDocFromUrl() {
    var param = new URLSearchParams(location.search).get('docNo');
    if (!param) return getDocument('AWS/GCN/01');
    return getDocument(param);
  }

  function populateAwsDataEntry(doc) {
    doc = doc || getAwsDocFromUrl();
    if (!doc || doc.type !== 'AWS') return;
    var batch = getBatch(doc.batchNo);
    if (!batch) return;
    var assigned = getUserDisplay(batch.assignedQcExec);
    var moaNo = 'MOA/' + doc.masterCode + '/01';
    var specNo = 'SPEC/' + doc.masterCode + '/01';

    document.title = 'AC-QMS — AWS data entry · ' + doc.docNo;
    document.body.dataset.docNo = doc.docNo;
    document.body.dataset.batchNo = batch.batchNo;
    document.body.dataset.moa = moaNo;
    document.body.dataset.spec = specNo;

    var ahDoc = document.querySelector('.ah-doc');
    if (ahDoc) ahDoc.textContent = doc.docNo;

    var statusEl = document.getElementById('awsStatusPill');
    if (statusEl) statusEl.outerHTML = statusPillHtml(doc).replace(/\s*pill-sm\s*/g, ' ');

    var ahProduct = document.querySelector('.ah-product');
    if (ahProduct) {
      ahProduct.textContent = 'Batch ' + batch.batchNo + ' · ' + batch.product + ' · Customer: ' + batch.customer;
    }

    var ahAssigned = document.getElementById('ahAssigned');
    if (ahAssigned) {
      ahAssigned.textContent = 'Assigned to ' + assigned.fullName +
        (assigned.roleShort ? ' · ' + assigned.roleShort : '');
    }

    var crumbBatch = document.getElementById('crumbBatch');
    if (crumbBatch) {
      crumbBatch.textContent = batch.batchNo;
      crumbBatch.href = batchUrl(batch.batchNo);
    }

    var crumbDoc = document.getElementById('crumbDoc');
    if (crumbDoc) crumbDoc.textContent = doc.docNo;

    var user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    var gate = { locked: false };
    if (user) {
      gate = applyAwsIssuanceGate(doc, user, batch);
      renderAwsTestSignatures(doc, user, batch, gate);
      refreshAwsSubmitState(doc);
    }
    populateAwsSecondaryHeader(doc, batch);
    return { doc: doc, batch: batch, user: user, gate: gate };
  }

  function renderTimeline(container, events, doc) {
    if (!container || !events) return;
    var typeClass = { sign: 't-sign', approve: 't-approve', submit: 't-submit', reject: 't-reject', neutral: 't-neutral' };
    container.innerHTML = events.map(function (ev) {
      var actor = getUserDisplay(ev.actor);
      var dept = 'QC';
      if (typeof findUser === 'function') {
        var u = findUser(ev.actor);
        if (u && u.department) dept = u.department;
      }
      var deptClass = dept === 'QA' ? 'dept-badge--qa' : 'dept-badge--qc';
      var roleLabel = actor.designation.replace('QC ', 'Executive — QC').replace('QA ', 'Manager — QA');
      if (actor.designation.indexOf('Manager') !== -1) roleLabel = 'Manager — ' + (dept === 'QA' ? 'QA' : 'QC');
      if (actor.designation.indexOf('Executive') !== -1) roleLabel = 'Executive — ' + (dept === 'QA' ? 'QA' : 'QC');
      var body = '<span class="ev-action">' + ev.action + (ev.rev ? ' <span class="rev">· ' + ev.rev + '</span>' : '') + '</span>' +
        '<div class="ev-actor"><span class="avatar">' + actor.initials + '</span>' +
        '<span class="who"><span class="nm">' + actor.fullName + '</span><span class="role">' + roleLabel + '</span>' +
        '<span class="dept-badge ' + deptClass + '">' + dept + '</span></span></div>';
      if (ev.comment) body += '<div class="ev-comment"><span class="q-label">Rejection comment</span>' + ev.comment + '</div>';
      if (ev.coords) body += '<span class="ev-coords"><svg class="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Geo: 23.0225° N, 72.5714° E</span>';
      body += '<span class="ev-note">' + (ev.note || '') + '</span>';
      return '<div class="event ' + (typeClass[ev.type] || 't-neutral') + '" data-type="' + ev.type + '">' +
        '<span class="event-dot"></span><div class="event-card">' +
        '<div class="ev-head"><span class="ev-time"><span class="date">' + ev.date + '</span> · ' + ev.time + '</span>' +
        '<span class="ev-geo"><svg class="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Captured</span></div>' +
        '<div class="ev-body">' + body + '</div></div></div>';
    }).join('');
  }

  window.BASELINE = deepClone(BASELINE);
  window.getState = getState;
  window.DEMO_BATCHES = state.batches;
  window.DEMO_DOCUMENTS = state.documents;
  window.DEMO_NOTIFICATIONS = state.notifications;
  window.DEMO_AUDIT_LOG = state.auditLog;
  window.DEMO_TIMELINE_EVENTS = state.timelineEvents;
  window.DEMO_SUBMITTERS = state.submitters;
  window.DEFAULT_BATCH = DEFAULT_BATCH;
  window.DEFAULT_DOC = DEFAULT_DOC;
  window.getProducts = getProducts;
  window.getProductById = getProductById;
  window.getProductFromUrl = getProductFromUrl;
  window.getProductByFamilyCode = getProductByFamilyCode;
  window.getProductByShortCode = getProductByShortCode;
  window.productKey = productKey;
  window.productUrl = productUrl;
  window.testParameterEditorUrl = testParameterEditorUrl;
  window.moaSectionEditorUrl = moaSectionEditorUrl;
  window.isDualLimitOperator = isDualLimitOperator;
  window.syncQuantLimitFields = syncQuantLimitFields;
  window.normalizeQuantTestLimits = normalizeQuantTestLimits;
  window.populateProductMasterEditorContext = populateProductMasterEditorContext;
  window.populateMoaSectionList = populateMoaSectionList;
  window.productReviewUrl = productReviewUrl;
  window.productStatusPillHtml = productStatusPillHtml;
  window.getProductsForUser = getProductsForUser;
  window.updateProductStatus = updateProductStatus;
  window.getProductApprovalQueue = getProductApprovalQueue;
  window.getPendingProductSignatures = getPendingProductSignatures;
  window.renderUserProductMasterList = renderUserProductMasterList;
  window.renderProductApprovalQueueRows = renderProductApprovalQueueRows;
  window.renderPendingProductSignatureRows = renderPendingProductSignatureRows;
  window.testCriteriaSummary = testCriteriaSummary;
  window.TEST_GROUP_ORDER = TEST_GROUP_ORDER;
  window.TEST_GROUP_LABELS = TEST_GROUP_LABELS;
  window.groupTestParameters = groupTestParameters;
  window.countMandatoryTests = countMandatoryTests;
  window.renderTestGroupLabelHtml = renderTestGroupLabelHtml;
  window.populateTestParameterList = populateTestParameterList;
  window.populateGroupedTestCards = populateGroupedTestCards;
  window.populateApprovalSpecTable = populateApprovalSpecTable;
  window.populateCoaResultsTable = populateCoaResultsTable;
  window.populateCreateSpecTestList = populateCreateSpecTestList;
  window.addProduct = addProduct;
  window.addBatch = addBatch;
  window.addDocument = addDocument;
  window.getNextARN = getNextARN;
  window.getNextSpecDocNo = getNextSpecDocNo;
  window.calcExpiryFromMfg = calcExpiryFromMfg;
  window.formatMfgFromMonthInput = formatMfgFromMonthInput;
  window.isBatchNoTaken = isBatchNoTaken;
  window.createBatchWithDocuments = createBatchWithDocuments;
  window.populateCreateSpecFromProduct = populateCreateSpecFromProduct;
  window.updateDocumentStatus = updateDocumentStatus;
  window.resetToBaseline = resetToBaseline;
  window.resetToEmpty = resetToEmpty;
  window.populateProductMaster = populateProductMaster;
  window.emptyListHtml = emptyListHtml;
  window.getUserDisplay = getUserDisplay;
  window.getBatch = getBatch;
  window.getDocument = getDocument;
  window.getDocumentsForBatch = getDocumentsForBatch;
  window.getDocFromUrl = getDocFromUrl;
  window.getBatchFromUrl = getBatchFromUrl;
  window.getBatchesForQcExec = getBatchesForQcExec;
  window.getActiveBatchCount = getActiveBatchCount;
  window.getAssignedBatchCount = getAssignedBatchCount;
  window.getApprovalQueue = getApprovalQueue;
  window.getPendingSignatures = getPendingSignatures;
  window.getDraftsForUser = getDraftsForUser;
  window.getRejectedForUser = getRejectedForUser;
  window.getNotificationsForUser = getNotificationsForUser;
  window.getAuditLog = getAuditLog;
  window.getReleasedBatches = getReleasedBatches;
  window.getTimelineForDoc = getTimelineForDoc;
  window.getBatchesForPipelineColumn = getBatchesForPipelineColumn;
  window.docUrl = docUrl;
  window.batchUrl = batchUrl;
  window.getCoaDocNoForBatch = getCoaDocNoForBatch;
  window.getCoaSignIssueUrl = getCoaSignIssueUrl;
  window.renderQcExecBatchRows = renderQcExecBatchRows;
  window.renderApprovalQueueRows = renderApprovalQueueRows;
  window.renderPendingSignatureRows = renderPendingSignatureRows;
  window.renderSubmitList = renderSubmitList;
  window.renderRejectList = renderRejectList;
  window.renderNotificationList = renderNotificationList;
  window.renderBatchPipelineColumn = renderBatchPipelineColumn;
  window.showParamNotFound = showParamNotFound;
  window.pickBestDocForBatch = pickBestDocForBatch;
  window.getCoasToIssue = getCoasToIssue;
  window.populateBatchDetail = populateBatchDetail;
  window.populateDocumentContext = populateDocumentContext;
  window.populateApprovalReview = populateApprovalReview;
  window.populateCoaDetail = populateCoaDetail;
  window.populateCreateSpec = populateCreateSpec;
  window.populateCreateSpecReview = populateCreateSpecReview;
  window.getAwsDocFromUrl = getAwsDocFromUrl;
  window.populateAwsDataEntry = populateAwsDataEntry;
  window.AWS_TEST_KEYS = AWS_TEST_KEYS;
  window.AWS_TEST_LABELS = AWS_TEST_LABELS;
  window.getAwsPendingIssuance = getAwsPendingIssuance;
  window.issueAwsProtocol = issueAwsProtocol;
  window.signAwsTestAnalyzed = signAwsTestAnalyzed;
  window.signAwsTestChecked = signAwsTestChecked;
  window.canUserCheckAwsTest = canUserCheckAwsTest;
  window.awsAllTestsSigned = awsAllTestsSigned;
  window.formatIssuanceStampDisplay = formatIssuanceStampDisplay;
  window.renderAwsPendingIssuanceRows = renderAwsPendingIssuanceRows;
  window.applyAwsIssuanceGate = applyAwsIssuanceGate;
  window.renderAwsTestSignatures = renderAwsTestSignatures;
  window.refreshAwsSubmitState = refreshAwsSubmitState;
  window.getRevisionHistoryColLabel = getRevisionHistoryColLabel;
  window.getDocumentRevisionHistory = getDocumentRevisionHistory;
  window.getSupersedesDisplay = getSupersedesDisplay;
  window.renderRevisionHistoryTable = renderRevisionHistoryTable;
  window.formatAwsRefSpecMoa = formatAwsRefSpecMoa;
  window.getAwsCompletionDate = getAwsCompletionDate;
  window.populateAwsSecondaryHeader = populateAwsSecondaryHeader;
  window.populateCoaStorageFooter = populateCoaStorageFooter;
  window.renderCoaIssueList = renderCoaIssueList;
  window.getRejectionsByApprover = getRejectionsByApprover;
  window.renderManagerRejectionList = renderManagerRejectionList;
  window.renderTimeline = renderTimeline;
  window.enrichAuditEntry = enrichAuditEntry;
})();
