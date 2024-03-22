const data = [
  {
    id: 1,
    date: '7/15/2023',
    description: 'Oth injury due to oth accident on board sailboat, subs'
  },
  {
    id: 2,
    date: '4/28/2023',
    description: '2-part displaced fracture of surgical neck of left humerus'
  },
  {
    id: 3,
    date: '6/22/2023',
    description: 'Nondisp spiral fx shaft of r fibula, 7thP'
  },
  {
    id: 4,
    date: '5/5/2023',
    description: 'Traum rupt of volar plate of l mid finger at MCP/IP jt, init'
  },
  {
    id: 5,
    date: '8/21/2023',
    description: 'Unsp mtrcy rider injured in clsn w 2/3-whl mv in traf, subs'
  },
  {
    id: 6,
    date: '9/13/2023',
    description: 'Toxic effect of contact w Portugese Man-o-war, undet, subs'
  },
  {
    id: 7,
    date: '11/4/2023',
    description: 'Active stage of trachoma'
  },
  {
    id: 8,
    date: '4/25/2023',
    description: 'Displ transverse fx shaft of r fibula, 7thN'
  },
  {
    id: 9,
    date: '4/11/2023',
    description: 'Type 1 diab with prolif diab rtnop with comb detach, l eye'
  },
  {
    id: 10,
    date: '7/19/2023',
    description: 'Toxic effect of ingested (parts of) plant(s), acc, sequela'
  },
  {
    id: 11,
    date: '2/25/2024',
    description: 'Nondisp comminuted fracture of shaft of unsp fibula, sequela'
  },
  {
    id: 12,
    date: '11/24/2023',
    description: 'Displaced fracture of trapezoid, right wrist, sequela'
  },
  {
    id: 13,
    date: '4/3/2023',
    description: 'Displ oblique fx shaft of r ulna, 7thR'
  },
  {
    id: 14,
    date: '10/26/2023',
    description: 'Adverse effect of expectorants, subsequent encounter'
  },
  {
    id: 15,
    date: '9/19/2023',
    description: 'Pasngr in hv veh inj in clsn w nonmtr vehicle nontraf, sqla'
  },
  {
    id: 16,
    date: '8/8/2023',
    description: 'Other ossification of muscle, left shoulder'
  },
  {
    id: 17,
    date: '12/25/2023',
    description: 'Other superficial bite of unsp part of neck, init encntr'
  },
  {
    id: 18,
    date: '4/9/2023',
    description: 'Poisoning by antipruritics, accidental (unintentional), subs'
  },
  {
    id: 19,
    date: '9/15/2023',
    description: 'Unsp fx upper end of r ulna, subs for clos fx w routn heal'
  },
  {
    id: 20,
    date: '5/26/2023',
    description: 'Laceration of deep palmar arch of unsp hand, subs encntr'
  },
  {
    id: 21,
    date: '11/18/2023',
    description: 'Acute respiratory failure, unsp w hypoxia or hypercapnia'
  },
  {
    id: 22,
    date: '3/14/2024',
    description: 'Inj femoral vein at hip and thigh level, unsp leg, init'
  },
  {
    id: 23,
    date: '3/19/2024',
    description: 'Kearns-Sayre syndrome, right eye'
  },
  {
    id: 24,
    date: '10/18/2023',
    description: 'Corrosion of third degree of right upper arm'
  },
  {
    id: 25,
    date: '9/27/2023',
    description: 'Other specified injury of pulmonary blood vessels'
  },
  {
    id: 26,
    date: '2/11/2024',
    description: 'Crushing injury of left little finger, sequela'
  },
  {
    id: 27,
    date: '8/31/2023',
    description: 'Carcinoma in situ of scrotum'
  },
  {
    id: 28,
    date: '3/31/2023',
    description: 'Displ artic fx head of r femr, 7thF'
  },
  {
    id: 29,
    date: '2/10/2024',
    description: 'Wedge comprsn fracture of T5-T6 vertebra, init for opn fx'
  },
  {
    id: 30,
    date: '12/3/2023',
    description: 'Acne excoriee'
  },
  {
    id: 31,
    date: '9/17/2023',
    description: 'Congenital pes planus, left foot'
  },
  {
    id: 32,
    date: '2/19/2024',
    description: 'Oth fx shaft of l tibia, 7thR'
  },
  {
    id: 33,
    date: '12/27/2023',
    description: 'Unsp fx first metacarpal bone, right hand, init for opn fx'
  },
  {
    id: 34,
    date: '12/23/2023',
    description: 'Oth fracture of upper and lower end of left fibula, init'
  },
  {
    id: 35,
    date: '3/26/2023',
    description: 'Burn of 3rd deg mu left fingers (nail), inc thumb, sequela'
  },
  {
    id: 36,
    date: '3/9/2024',
    description: 'Other sprain of left index finger, initial encounter'
  },
  {
    id: 37,
    date: '9/9/2023',
    description: 'Oth benign neoplasm skin/ left eyelid, including canthus'
  },
  {
    id: 38,
    date: '11/19/2023',
    description: 'Enterovirus infection, unspecified'
  },
  {
    id: 39,
    date: '6/19/2023',
    description: 'Ped on skateboard injured in collision w 2/3-whl mv, unsp'
  },
  {
    id: 40,
    date: '9/3/2023',
    description: 'Anterior disp fx of sternal end of right clavicle, sequela'
  },
  {
    id: 41,
    date: '3/31/2023',
    description: 'Myiasis of other sites'
  },
  {
    id: 42,
    date: '4/20/2023',
    description: 'Unsp inj extn musc/fasc/tend r rng fngr at wrs/hnd lv, subs'
  },
  {
    id: 43,
    date: '12/21/2023',
    description: 'Preterm labor without delivery, second trimester'
  },
  {
    id: 44,
    date: '10/9/2023',
    description: 'Displ commnt fx shaft of r fibula, 7thK'
  },
  {
    id: 45,
    date: '10/5/2023',
    description: 'Pigmentary glaucoma, left eye, indeterminate stage'
  },
  {
    id: 46,
    date: '6/15/2023',
    description: 'Unspecified aircraft accident injuring occupant, subs encntr'
  },
  {
    id: 47,
    date: '6/13/2023',
    description: 'Nondisp fx of l tibial spin, 7thQ'
  },
  {
    id: 48,
    date: '2/16/2024',
    description: 'Hypermetropia, unspecified eye'
  },
  {
    id: 49,
    date: '3/17/2024',
    description: 'Unsp car occ injured in clsn w pick-up truck in traf, subs'
  },
  {
    id: 50,
    date: '5/18/2023',
    description: 'Laceration of peroneal artery, right leg'
  }
];

export default data;
