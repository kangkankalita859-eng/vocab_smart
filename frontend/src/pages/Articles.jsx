import { useState } from "react";
import useMobile from "../hooks/useMobile";

export default function Articles({ onGoHome, partNumber }) {
  const { isMobile } = useMobile();

  const handleViewConstitution = () => {
    console.log('Constitution button clicked');
    
    // Use same navigation pattern as other components in the app
    if (window.setAppStage) {
      window.setAppStage('constitution');
    } else {
      // Fallback: try to trigger navigation like other components
      try {
        window.location.href = '#constitution';
        console.log('Direct navigation to constitution');
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Please refresh the page to navigate to Constitution.');
      }
    }
  };

  const handleViewParts = () => {
    console.log('Parts button clicked');
    
    // Use same navigation pattern as other components in the app
    if (window.setAppStage) {
      window.setAppStage('parts');
    } else {
      // Fallback: try to trigger navigation like other components
      try {
        window.location.href = '#parts';
        console.log('Direct navigation to parts');
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Please refresh the page to navigate to Parts.');
      }
    }
  };

  // Articles content data for each part
  const articlesContent = {
    "Part I": {
      title: "Part I - The Union and its Territory",
      articles: "Articles 1-4",
      description: "Defines India as a Union of States, specifies territories, provisions regarding formation of new states and alteration of areas, boundaries, and names of existing states.",
      articlesList: [
        {
          article: "Article 1",
          title: "Name and territory of the Union",
          content: "India, that is Bharat, shall be a Union of States. The States and the territories thereof shall be as specified in the First Schedule. The territory of India shall comprise: (a) the territories of the States; (b) the Union territories specified in the First Schedule; and (c) such other territories as may be acquired."
        },
        {
          article: "Article 2",
          title: "Admission or establishment of new States",
          content: "Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit."
        },
        {
          article: "Article 3",
          title: "Formation of new States and alteration of areas, boundaries or names of existing States",
          content: "Parliament may by law: (a) form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State; (b) increase the area of any State; (c) diminish the area of any State; (d) alter the boundaries of any State; (e) alter the name of any State."
        },
        {
          article: "Article 4",
          title: "Laws made under articles 2 and 3",
          content: "Any law referred to in article 2 or article 3 shall contain such provisions for the amendment of the First Schedule and the Fourth Schedule as may be necessary to give effect to the provisions of the law and may also contain such supplemental, incidental and consequential provisions as Parliament may deem necessary."
        }
      ]
    },
    "Part II": {
      title: "Part II - Citizenship",
      articles: "Articles 5-11",
      description: "Defines citizenship at the commencement of the Constitution, rights of citizenship of certain persons who have migrated to India from territories included in Pakistan, and rights of citizenship of certain migrants to Pakistan and persons of Indian origin residing outside India.",
      articlesList: [
        {
          article: "Article 5",
          title: "Citizenship at the commencement of the Constitution",
          content: "At the commencement of this Constitution, every person who has his domicile in the territory of India and: (a) who was born in the territory of India; or (b) either of whose parents was born in the territory of India; or (c) who has been ordinarily resident in the territory of India for not less than five years immediately preceding such commencement, shall be a citizen of India."
        },
        {
          article: "Article 6",
          title: "Rights of citizenship of certain persons who have migrated to India from Pakistan",
          content: "Every person who has migrated to the territory of India from the territory now included in Pakistan shall be deemed to be a citizen of India at the commencement of this Constitution if he or either of his parents or any of his grand-parents was born in India as defined in the Government of India Act, 1935."
        },
        {
          article: "Article 7",
          title: "Rights of citizenship of certain migrants to Pakistan",
          content: "Notwithstanding anything in articles 5 and 6, a person who has after the commencement of this Constitution migrated from the territory of India to the territory now included in Pakistan shall not be deemed to be a citizen of India."
        },
        {
          article: "Article 8",
          title: "Rights of citizenship of certain persons of Indian origin residing outside India",
          content: "Any person who or either of whose parents or any of whose grand-parents was born in India as defined in the Government of India Act, 1935, and who is ordinarily residing in any country outside India shall be deemed to be a citizen of India if he has been registered as a citizen of India by the diplomatic or consular representative of India in the country where he is for the time being residing."
        },
        {
          article: "Article 9",
          title: "Voluntary acquisition of citizenship of a foreign State",
          content: "No person shall be a citizen of India by virtue of article 5, or be deemed to be a citizen of India by virtue of article 6 or article 8, if he has voluntarily acquired the citizenship of any foreign State."
        },
        {
          article: "Article 10",
          title: "Continuance of the rights of citizenship",
          content: "Every person who is or is deemed to be a citizen of India under any of the foregoing provisions of this Part shall, subject to the provisions of any law that may be made by Parliament, continue to be such citizen."
        },
        {
          article: "Article 11",
          title: "Parliament to regulate the right of citizenship by law",
          content: "Nothing in the foregoing provisions of this Part shall derogate from the power of Parliament to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship."
        }
      ]
    },
    "Part III": {
      title: "Part III - Fundamental Rights",
      articles: "Articles 12-35",
      description: "Guarantees fundamental rights to all citizens including equality before law, prohibition of discrimination, equality of opportunity, freedom of speech, protection of life and personal liberty, right to education, and cultural and educational rights.",
      articlesList: [
        {
          article: "Article 12",
          title: "Definition",
          content: "In this Part, unless the context otherwise requires, 'the State' includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India."
        },
        {
          article: "Article 13",
          title: "Laws inconsistent with or in derogation of the fundamental rights",
          content: "All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void. The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void."
        },
        {
          article: "Article 14",
          title: "Equality before law",
          content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
        },
        {
          article: "Article 15",
          title: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          content: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to: (a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public."
        },
        {
          article: "Article 16",
          title: "Equality of opportunity in public employment",
          content: "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State."
        },
        {
          article: "Article 17",
          title: "Abolition of untouchability",
          content: "'Untouchability' is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of 'Untouchability' shall be an offence punishable in accordance with law."
        },
        {
          article: "Article 18",
          title: "Abolition of titles",
          content: "No title, not being a military or academic distinction, shall be conferred by the State. No citizen of India shall accept any title from any foreign State. No person who is not a citizen of India shall, while he holds any office of profit or trust under the State, accept without the consent of the President any title from any foreign State."
        },
        {
          article: "Article 19",
          title: "Protection of certain rights regarding freedom of speech, etc.",
          content: "All citizens shall have the right: (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; (f) to practise any profession, or to carry on any occupation, trade or business."
        },
        {
          article: "Article 20",
          title: "Protection in respect of conviction for offences",
          content: "No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence. No person shall be prosecuted and punished for the same offence more than once."
        },
        {
          article: "Article 21",
          title: "Protection of life and personal liberty",
          content: "No person shall be deprived of his life or personal liberty except according to procedure established by law."
        },
        {
          article: "Article 21A",
          title: "Right to education",
          content: "The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine."
        },
        {
          article: "Article 22",
          title: "Protection against arrest and detention in certain cases",
          content: "No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice. Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate."
        }
      ]
    },
    "Part IV": {
      title: "Part IV - Directive Principles of State Policy",
      articles: "Articles 36-51",
      description: "Contains fundamental principles for governance of the state, including securing a social order for the promotion of welfare of the people, minimizing inequalities in income, and securing the right to work, education, and public assistance.",
      articlesList: [
        {
          article: "Article 36",
          title: "Definition",
          content: "In this Part, unless the context otherwise requires, 'the State' has the same meaning as in Part III."
        },
        {
          article: "Article 37",
          title: "Application of the principles contained in this Part",
          content: "The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws."
        },
        {
          article: "Article 38",
          title: "State to secure a social order for the promotion of welfare of the people",
          content: "The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life. The State shall, in particular, strive to minimize the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations."
        },
        {
          article: "Article 39",
          title: "Certain principles of policy to be followed by the State",
          content: "The State shall, in particular, direct its policy towards securing: (a) that the citizens, men and women equally, have the right to an adequate means of livelihood; (b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good; (c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment; (d) that there is equal pay for equal work for both men and women; (e) that the health and strength of workers, men and women, and the tender age of children are not abused and that citizens are not forced by economic necessity to enter avocations unsuited to their age or strength."
        },
        {
          article: "Article 40",
          title: "Organisation of village panchayats",
          content: "The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government."
        },
        {
          article: "Article 41",
          title: "Right to work, to education and to public assistance in certain cases",
          content: "The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement, and in other cases of undeserved want."
        },
        {
          article: "Article 42",
          title: "Provision for just and humane conditions of work and maternity relief",
          content: "The State shall make provision for securing just and humane conditions of work and for maternity relief."
        },
        {
          article: "Article 43",
          title: "Living wage, etc., for workers",
          content: "The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers, agricultural, industrial or otherwise, a living wage, conditions of work ensuring a decent standard of life and full enjoyment of leisure and social and cultural opportunities and, in particular, the State shall endeavour to promote cottage industries on an individual or co-operative basis in rural areas."
        },
        {
          article: "Article 44",
          title: "Uniform civil code for the citizens",
          content: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India."
        },
        {
          article: "Article 45",
          title: "Provision for free and compulsory education for children",
          content: "The State shall endeavour to provide, within a period of ten years from the commencement of this Constitution, for free and compulsory education for all children until they complete the age of fourteen years."
        },
        {
          article: "Article 46",
          title: "Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections",
          content: "The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and the Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation."
        },
        {
          article: "Article 47",
          title: "Duty of the State to raise the level of nutrition and the standard of living and to improve public health",
          content: "The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties and, in particular, the State shall endeavour to bring about prohibition of the consumption except for medicinal purposes of intoxicating drinks and of drugs which are injurious to health."
        },
        {
          article: "Article 48",
          title: "Organisation of agriculture and animal husbandry",
          content: "The State shall endeavour to organise agriculture and animal husbandry on modern and scientific lines and shall, in particular, take steps for preserving and improving the breeds, and prohibiting the slaughter, of cows and calves and other milch and draught cattle."
        },
        {
          article: "Article 49",
          title: "Protection of monuments and objects and places of national importance",
          content: "It shall be the obligation of the State to protect every monument or place or object of artistic or historic interest, declared by or under law made by Parliament to be of national importance, from spoliation, disfigurement, destruction, removal, disposal or export, as the case may be."
        },
        {
          article: "Article 50",
          title: "Separation of judiciary from executive",
          content: "The State shall take steps to separate the judiciary from the executive in the public services of the State."
        },
        {
          article: "Article 51",
          title: "Promotion of international peace and security",
          content: "The State shall endeavour to: (a) promote international peace and security; (b) maintain just and honourable relations between nations; (c) foster respect for international law and treaty obligations in the dealings of organised peoples with one another; and (d) encourage settlement of international disputes by arbitration."
        }
      ]
    },
    "Part IV-A": {
      title: "Part IV-A - Fundamental Duties",
      articles: "Article 51-A",
      description: "Specifies fundamental duties of citizens including respecting the Constitution, national flag, and national anthem, cherishing noble ideals, defending the country, promoting harmony, protecting environment, and developing scientific temper.",
      articlesList: [
        {
          article: "Article 51-A",
          title: "Fundamental duties",
          content: "It shall be the duty of every citizen of India: (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; (b) to cherish and follow the noble ideals which inspired our national struggle for freedom; (c) to uphold and protect the sovereignty, unity and integrity of India; (d) to defend the country and render national service when called upon to do so; (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women; (f) to value and preserve the rich heritage of our composite culture; (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures; (h) to develop the scientific temper, humanism and the spirit of inquiry and reform; (i) to safeguard public property and to abjure violence; (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement."
        }
      ]
    },
    "Part V": {
      title: "Part V - The Union",
      articles: "Articles 52-151",
      description: "Deals with the Union Executive including the President and Vice-President, Prime Minister and Council of Ministers, Parliament with its composition and functions, and legislative powers of the Union.",
      articlesList: [
        {
          article: "Article 52",
          title: "The President of India",
          content: "There shall be a President of India."
        },
        {
          article: "Article 53",
          title: "Executive power of the Union",
          content: "The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with the Constitution."
        },
        {
          article: "Article 54",
          title: "Election of President",
          content: "The President shall be elected by the members of an electoral college consisting of the elected members of both Houses of Parliament and the elected members of the Legislative Assemblies of the States."
        },
        {
          article: "Article 55",
          title: "Manner of election of President",
          content: "As far as may be, the President shall be elected by the system of proportional representation by means of the single transferable vote and the voting at such election shall be by secret ballot."
        },
        {
          article: "Article 56",
          title: "Term of office of President",
          content: "The President shall hold office for a term of five years from the date on which he enters upon his office: Provided that: (a) the President may, by writing under his hand addressed to the Vice-President, resign his office; (b) the President may be removed from his office by impeachment for violation of the Constitution."
        },
        {
          article: "Article 57",
          title: "Eligibility for re-election",
          content: "A person who holds, or who has held, office as President shall, subject to the other provisions of this Constitution, be eligible for re-election to that office."
        },
        {
          article: "Article 58",
          title: "Qualifications for election as President",
          content: "No person shall be eligible for election as President unless he is a citizen of India, has completed the age of thirty-five years, and is qualified for election as a member of the House of the People."
        },
        {
          article: "Article 59",
          title: "Conditions of President's office",
          content: "The President shall not be a member of either House of Parliament or of a House of the Legislature of any State, and if a person so elected is a member of either House of Parliament or of a House of the Legislature of any State, he shall be deemed to have vacated his seat in that House on the date on which he enters upon his office as President."
        },
        {
          article: "Article 60",
          title: "Oath or affirmation by the President",
          content: "Every President and every person acting as President or discharging the functions of the President shall, before entering upon his office, make and subscribe in the presence of the Chief Justice of India or, in his absence, the senior-most Judge of the Supreme Court available, an oath or affirmation in the form set out for the purpose in the Third Schedule."
        },
        {
          article: "Article 61",
          title: "Procedure for impeachment of the President",
          content: "When a President is to be impeached for violation of the Constitution, the charge shall be preferred by either House of Parliament. No such charge shall be preferred unless: (a) the proposal to prefer such charge is contained in a resolution which has been moved after at least fourteen days' notice in writing signed by not less than one-fourth of the total number of members of the House; and (b) such resolution has been passed by a majority of not less than two-thirds of the total membership of the House."
        }
      ]
    },
    "Part VI": {
      title: "Part VI - The States",
      articles: "Articles 152-237",
      description: "Covers the State Executive including Governors, Chief Ministers and Council of Ministers, State Legislature with composition and functions, and legislative powers of the States.",
      articlesList: [
        {
          article: "Article 152",
          title: "Definition",
          content: "In this Part, unless the context otherwise requires, 'State' does not include the State of Jammu and Kashmir."
        },
        {
          article: "Article 153",
          title: "Governors of States",
          content: "There shall be a Governor for each State."
        },
        {
          article: "Article 154",
          title: "Executive power of State",
          content: "The executive power of the State shall be vested in the Governor and shall be exercised by him either directly or through officers subordinate to him in accordance with the Constitution."
        },
        {
          article: "Article 155",
          title: "Appointment of Governor",
          content: "The Governor of a State shall be appointed by the President by warrant under his hand."
        },
        {
          article: "Article 156",
          title: "Term of office of Governor",
          content: "The Governor shall hold office during the pleasure of the President: Provided that a Governor shall, notwithstanding the expiration of his term, continue to hold office until his successor enters upon his office."
        },
        {
          article: "Article 157",
          title: "Qualifications for appointment as Governor",
          content: "No person shall be eligible for appointment as Governor unless he is a citizen of India and has completed the age of thirty-five years."
        },
        {
          article: "Article 158",
          title: "Conditions of Governor's office",
          content: "The Governor shall not be a member of either House of Parliament or of a House of the Legislature of any State, and if a person so appointed is a member of either House of Parliament or of a House of the Legislature of any State, he shall be deemed to have vacated his seat in that House on the date on which he enters upon his office as Governor."
        },
        {
          article: "Article 159",
          title: "Oath or affirmation by the Governor",
          content: "Every Governor and every person discharging the functions of the Governor shall, before entering upon his office, make and subscribe in the presence of the Chief Justice of the High Court or, in his absence, the senior-most Judge of that Court available, an oath or affirmation in the form set out for the purpose in the Third Schedule."
        },
        {
          article: "Article 160",
          title: "Discharge of the functions of the Governor in certain contingencies",
          content: "The President may make such provision as he thinks fit for the discharge of the functions of the Governor of a State in any contingency not provided for in this Constitution."
        },
        {
          article: "Article 161",
          title: "Power of Governor to grant pardons, etc., and to suspend, remit or commute sentences in certain cases",
          content: "The Governor of a State shall have the power to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute the sentence of any person convicted of an offence against any law relating to a matter to which the executive power of the State extends."
        },
        {
          article: "Article 162",
          title: "Extent of executive power of State",
          content: "Subject to the provisions of this Constitution, the executive power of a State shall extend to the matters with respect to which the Legislature of the State has power to make laws."
        },
        {
          article: "Article 163",
          title: "Council of Ministers to aid and advise Governor",
          content: "There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion."
        },
        {
          article: "Article 164",
          title: "Other provisions as to Ministers",
          content: "The Ministers shall hold office during the pleasure of the Governor: Provided that in the States of Bihar, Madhya Pradesh and Orissa, there shall be a Minister in charge of tribal welfare who may in addition be in charge of the welfare of the Scheduled Castes and backward classes or any other work. The Governor shall administer the oaths of office and secrecy to the Ministers."
        },
        {
          article: "Article 165",
          title: "Advocate-General for the State",
          content: "The Governor of each State shall appoint a person who is qualified to be appointed a Judge of a High Court to be Advocate-General for the State."
        },
        {
          article: "Article 166",
          title: "Conduct of business of the Government of a State",
          content: "All executive action of the Government of a State shall be expressed to be taken in the name of the Governor. Orders and other instruments made and executed in the name of the Governor shall be authenticated in such manner as may be specified in rules to be made by the Governor."
        },
        {
          article: "Article 167",
          title: "Duties of Chief Minister as respects the furnishing of information to Governor, etc.",
          content: "It shall be the duty of the Chief Minister of each State: (a) to communicate to the Governor all decisions of the Council of Ministers relating to the administration of the affairs of the State and proposals for legislation; (b) to furnish such information relating to the administration and affairs of the State and proposals for legislation as the Governor may call for; and (c) if the Governor so requires, to consider for the Council of Ministers any matter on which a decision has been taken by a Minister but which has not been considered by the Council."
        },
        {
          article: "Article 168",
          title: "Constitution of Legislatures in States",
          content: "For every State there shall be a Legislature which shall consist of the Governor, and: (a) in the case of some States, two Houses; and (b) in the case of the other States, one House. Where there are two Houses of the Legislature of a State, one shall be known as the Legislative Council and the other as the Legislative Assembly."
        },
        {
          article: "Article 169",
          title: "Abolition or creation of Legislative Councils in States",
          content: "Notwithstanding anything contained in article 168, Parliament may by law provide for the abolition of the Legislative Council of a State having such a Council or for the creation of such a Council in a State having no such Council, if the Legislative Assembly of the State passes a resolution to that effect by a majority of the total membership of the Assembly and by a majority of not less than two-thirds of the members of the Assembly present and voting."
        },
        {
          article: "Article 170",
          title: "Composition of the Legislative Assemblies",
          content: "The Legislative Assembly of a State shall consist of persons directly elected by the people of the State from territorial constituencies in the State. The total number of members in the Legislative Assembly of a State shall not exceed five hundred and shall not be less than sixty."
        },
        {
          article: "Article 171",
          title: "Composition of the Legislative Councils",
          content: "The total number of members in the Legislative Council of a State having such a Council shall not exceed one-third of the total number of members in the Legislative Assembly of that State and in no case shall be less than forty. The members shall be elected in accordance with the system of proportional representation by means of the single transferable vote."
        },
        {
          article: "Article 172",
          title: "Duration of State Legislatures",
          content: "The Legislative Assembly of every State, unless sooner dissolved, shall continue for five years from the date appointed for its first meeting and no longer. The Legislative Council of a State shall not be subject to dissolution, but as nearly as possible one-third of the members thereof shall retire as soon as may be on the expiration of every second year."
        },
        {
          article: "Article 173",
          title: "Qualification for membership of the State Legislature",
          content: "A person shall be qualified for election as a member of the Legislative Assembly of a State if he is a citizen of India, makes and subscribes before some person authorized in that behalf by the Election Commission an oath or affirmation according to the form set out for the purpose in the Third Schedule, and is, in the case of a seat in the Legislative Assembly, not less than twenty-five years of age and, in the case of a seat in the Legislative Council, not less than thirty years of age."
        },
        {
          article: "Article 174",
          title: "Sessions of the State Legislature, prorogation and dissolution",
          content: "The Governor shall from time to time summon the House or each House of the Legislature of the State to meet at such time and place as he thinks fit, but six months shall not intervene between its last sitting in one session and the date appointed for its first sitting in the next session."
        },
        {
          article: "Article 175",
          title: "Right of Governor to address and send messages to the House or Houses",
          content: "The Governor may address the Legislative Assembly or, in the case of a State having a Legislative Council, both Houses assembled together and may, for that purpose, require the attendance of members. The Governor may send messages to either House of the Legislature of the State, whether with respect to a Bill then pending in the Legislature or otherwise."
        },
        {
          article: "Article 176",
          title: "Special address by the Governor",
          content: "At the commencement of the first session after each general election to the Legislative Assembly and at the commencement of the first session of each year, the Governor shall address the Legislative Assembly or, in the case of a State having a Legislative Council, both Houses assembled together and inform the Legislature of the causes of its summons."
        },
        {
          article: "Article 177",
          title: "Right of Ministers and Advocate-General as respects the Houses",
          content: "The Chief Minister, other Ministers and the Advocate-General for a State shall have the right to speak in, and otherwise take part in the proceedings of, the Legislative Assembly or, in the case of a State having a Legislative Council, both Houses, but shall not by virtue of this article be entitled to vote."
        },
        {
          article: "Article 178",
          title: "Officers of the State Legislature",
          content: "The Legislative Assembly of every State shall have a Speaker and a Deputy Speaker elected by the Assembly. In the case of a State having a Legislative Council, the Council shall have a Chairman and a Deputy Chairman elected by the Council."
        },
        {
          article: "Article 179",
          title: "Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker",
          content: "The Speaker or Deputy Speaker of a Legislative Assembly shall vacate his office if he ceases to be a member of the Assembly. The Speaker or Deputy Speaker may resign his office by writing under his hand addressed to the Deputy Speaker or, as the case may be, the Speaker."
        },
        {
          article: "Article 180",
          title: "Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker",
          content: "While the office of Speaker is vacant, the duties of the office shall be performed by the Deputy Speaker or, if the office of Deputy Speaker is also vacant, by such member of the Assembly as the Governor may appoint for the purpose."
        },
        {
          article: "Article 181",
          title: "The Speaker or the Deputy Speaker not to preside while a resolution for his removal from office is under consideration",
          content: "The Speaker or, as the case may be, the Deputy Speaker shall not preside at a sitting of the Assembly while a resolution for his removal from office is under consideration."
        },
        {
          article: "Article 182",
          title: "Removal of, and vacation of office by, the Chairman and Deputy Chairman",
          content: "The Chairman or Deputy Chairman of a Legislative Council shall vacate his office if he ceases to be a member of the Council. The Chairman or Deputy Chairman may resign his office by writing under his hand addressed to the Deputy Chairman or, as the case may be, the Chairman."
        },
        {
          article: "Article 183",
          title: "Power of the Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman",
          content: "While the office of Chairman is vacant, the duties of the office shall be performed by the Deputy Chairman or, if the office of Deputy Chairman is also vacant, by such member of the Council as the Governor may appoint for the purpose."
        },
        {
          article: "Article 184",
          title: "The Chairman or the Deputy Chairman not to preside while a resolution for his removal from office is under consideration",
          content: "The Chairman or, as the case may be, the Deputy Chairman shall not preside at a sitting of the Council while a resolution for his removal from office is under consideration."
        },
        {
          article: "Article 185",
          title: "Salaries and allowances of the Speaker and Deputy Speaker and the Chairman and Deputy Chairman",
          content: "The salaries and allowances of the Speaker and Deputy Speaker of the Legislative Assembly and the Chairman and Deputy Chairman of the Legislative Council shall be such as may be determined by the Legislature of the State by law."
        },
        {
          article: "Article 186",
          title: "Secretariat of State Legislature",
          content: "Each House of the Legislature of a State shall have a separate secretarial staff. The secretarial staff of either House shall be appointed by the Speaker or, as the case may be, the Chairman of that House."
        },
        {
          article: "Article 187",
          title: "Oath or affirmation by members",
          content: "Every member of either House of the Legislature of a State shall, before taking his seat, make and subscribe before the Governor, or some person appointed in that behalf by him, an oath or affirmation according to the form set out for the purpose in the Third Schedule."
        },
        {
          article: "Article 188",
          title: "Voting in Houses, power of Houses to act notwithstanding vacancies and quorum",
          content: "All questions at any sitting of a House of the Legislature of a State shall be determined by a majority of votes of the members present and voting. The Speaker or Chairman, or person acting as such, shall not vote in the first instance, but shall have and exercise a casting vote in the case of an equality of votes."
        },
        {
          article: "Article 189",
          title: "Vacation of seats",
          content: "No person shall be a member of either House of the Legislature of a State if he holds any office of profit under the Union or the State, other than an office declared by Parliament by law not to disqualify its holder."
        },
        {
          article: "Article 190",
          title: "Disqualifications for membership",
          content: "A person shall be disqualified for being chosen as, and for being, a member of either House of the Legislature of a State if he is so disqualified: (a) under any law made by Parliament; or (b) under any law made by the Legislature of the State."
        },
        {
          article: "Article 191",
          title: "Disqualifications for membership on grounds of defection",
          content: "A person shall be disqualified for being chosen as, and for being, a member of either House of the Legislature of a State if he is so disqualified under the Tenth Schedule."
        },
        {
          article: "Article 192",
          title: "Decision on questions as to disqualifications of members",
          content: "If any question arises as to whether a member of a House of the Legislature of a State has become subject to any of the disqualifications mentioned in clause (1) of article 189, the question shall be referred for the decision of the Governor and the Governor shall act in accordance with the opinion of the Election Commission."
        },
        {
          article: "Article 193",
          title: "Penalty for sitting and voting before taking oath",
          content: "If a person sits or votes as a member of either House of the Legislature of a State before he has complied with the requirements of article 187, or when he knows that he is not qualified or is disqualified from membership, he shall be liable in respect of each day on which he so sits or votes to a penalty of five hundred rupees to be recovered as a debt due to the State."
        },
        {
          article: "Article 194",
          title: "Powers, privileges, etc., of the Houses of Legislatures and of the members and committees thereof",
          content: "The powers, privileges and immunities of a House of the Legislature of a State, and of the members and committees of a House of such Legislature, shall be such as may from time to time be defined by the Legislature by law, and, until so defined, shall be those of that House and of its members and committees immediately before the commencement of section 58 of the Constitution (Forty-second Amendment) Act, 1976."
        },
        {
          article: "Article 195",
          title: "Salaries and allowances of members",
          content: "Members of the Legislative Assembly and the Legislative Council of a State shall be entitled to receive such salaries and allowances as may from time to time be determined by the Legislature of the State by law."
        },
        {
          article: "Article 196",
          title: "Legislative procedure",
          content: "Subject to the provisions of articles 198 and 207 with respect to Money Bills and other financial Bills, a Bill may originate in either House of the Legislature of a State which has two Houses, and shall not, unless it is a Money Bill, be deemed to have been passed by the Houses of the Legislature unless it has been agreed to by both Houses."
        },
        {
          article: "Article 197",
          title: "Restriction on powers of Legislative Council as to Bills other than Money Bills",
          content: "In the case of a Bill other than a Money Bill, a Legislative Council may make any recommendations in respect of the Bill to the Legislative Assembly, but the Assembly shall not be bound to consider the recommendations."
        },
        {
          article: "Article 198",
          title: "Money Bills",
          content: "A Bill shall be deemed to be a Money Bill if it contains only provisions dealing with all or any of the following matters: (a) the imposition, abolition, remission, alteration or regulation of any tax; (b) the borrowing of money or the giving of any guarantee by the State; (c) the custody of the Consolidated Fund or the Contingency Fund of the State, the payment of moneys into or the withdrawal of moneys from any such Fund; (d) the appropriation of moneys out of the Consolidated Fund of the State; (e) the declaring of any expenditure to be expenditure charged on the Consolidated Fund of the State."
        },
        {
          article: "Article 199",
          title: "Definition of 'Money Bills'",
          content: "In this article and in article 200, 'Money Bill' means a Bill which contains only provisions dealing with all or any of the matters specified in sub-clauses (a) to (f) of clause (1) of article 198."
        },
        {
          article: "Article 200",
          title: "Assent to Bills",
          content: "When a Bill has been passed by the Legislative Assembly of a State having a Legislative Council, it shall be presented to the Governor and the Governor shall declare either that he assents to the Bill or that he withholds assent therefrom or that he reserves the Bill for the consideration of the President."
        },
        {
          article: "Article 201",
          title: "Bills reserved for consideration",
          content: "When a Bill is reserved by a Governor for the consideration of the President, the President shall declare either that he assents to the Bill or that he withholds assent therefrom."
        },
        {
          article: "Article 202",
          title: "Bills passed by the Legislatures of States",
          content: "No Bill passed by the Legislature of a State shall be deemed to have been passed by the Legislature of the State unless it has been agreed to by both Houses, where the Legislature has two Houses."
        },
        {
          article: "Article 203",
          title: "Ordinances",
          content: "If at any time, except when the Legislature of a State is in session, the Governor is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate Ordinances as the circumstances appear to him to require."
        },
        {
          article: "Article 204",
          title: "Ordinances promulgated by Governor",
          content: "An Ordinance promulgated under this article shall have the same force and effect as an Act of the Legislature of the State which assents to it, but every such Ordinance: (a) shall be laid before the Legislative Assembly of the State, or, where the State has a Legislative Council, both Houses, and shall cease to operate at the expiration of six weeks from the reassembly of the Legislature or, if before the expiration of that period a resolution disapproving of the Ordinance is passed by the Legislature, upon the passing of the resolution."
        },
        {
          article: "Article 205",
          title: "Power of Governor to promulgate Ordinances during recess of Legislature",
          content: "The Governor may, at any time, withdraw an Ordinance promulgated by him and he shall, unless the same is withdrawn, take effect from the date of its promulgation."
        },
        {
          article: "Article 206",
          title: "Power of Governor to promulgate Ordinances on the recommendation of the President",
          content: "If the Governor is satisfied that circumstances exist which render it necessary for him to take immediate action, he may, after consultation with the Council of Ministers, promulgate such Ordinances as the circumstances appear to him to require."
        },
        {
          article: "Article 207",
          title: "Rules of procedure",
          content: "The Legislature of a State may make rules for regulating subject to the provisions of this Constitution, its procedure and the conduct of business."
        },
        {
          article: "Article 208",
          title: "Regulation by law of procedure in the Legislature of the State",
          content: "The Legislature of a State may, by law, make provisions with respect to all matters relating to, or in connection with, the procedure of, or the conduct of business in, the House or either House of the Legislature of the State."
        },
        {
          article: "Article 209",
          title: "Regulation by law of procedure in the Legislature of the State in relation to financial business",
          content: "The Legislature of a State may, by law, make provisions with respect to all matters relating to, or in connection with, the procedure of, or the conduct of business in, the House or either House of the Legislature of the State in relation to financial business."
        },
        {
          article: "Article 210",
          title: "Language to be used in the Legislature",
          content: "The business in the Legislature of a State shall be transacted in the official language of the State or in Hindi or, if the Legislature of the State by a law so provides, in English."
        },
        {
          article: "Article 211",
          title: "Restriction on discussion in the Legislature",
          content: "No discussion shall take place in the Legislature of a State with respect to the conduct of any Judge of the Supreme Court or of a High Court in the discharge of his duties."
        },
        {
          article: "Article 212",
          title: "Courts not to inquire into proceedings of the Legislature",
          content: "No court shall entertain any question touching the validity of any proceedings in the Legislature of a State on the ground of any alleged irregularity of procedure."
        },
        {
          article: "Article 213",
          title: "Officers and servants and the expenses of the Legislature",
          content: "The Legislature of a State may, by law, regulate the recruitment, and the conditions of service of persons appointed, to the secretarial staff of either House of the Legislature of the State."
        },
        {
          article: "Article 214",
          title: "High Courts for States",
          content: "There shall be a High Court for each State."
        },
        {
          article: "Article 215",
          title: "High Courts to be a court of record",
          content: "Every High Court shall be a court of record and shall have all the powers of such a court including the power to punish for contempt of itself."
        },
        {
          article: "Article 216",
          title: "Constitution of High Courts",
          content: "Every High Court shall consist of a Chief Justice and such other Judges as the President may from time to time deem it necessary to appoint."
        },
        {
          article: "Article 217",
          title: "Appointment and conditions of the office of a Judge of a High Court",
          content: "A Judge shall be appointed by the President by warrant under his hand and seal and shall hold office until he attains the age of sixty-two years."
        },
        {
          article: "Article 218",
          title: "Application of provisions relating to Supreme Court",
          content: "The provisions of clauses (4) and (5) of article 124 shall apply in relation to a High Court as they apply in relation to the Supreme Court."
        },
        {
          article: "Article 219",
          title: "Oath or affirmation by Judges of High Courts",
          content: "Every person appointed to be a Judge of a High Court shall, before he enters upon his office, make and subscribe before the Governor of the State, or some person appointed in that behalf by him, an oath or affirmation according to the form set out for the purpose in the Third Schedule."
        },
        {
          article: "Article 220",
          title: "Restriction on practice after being a permanent Judge",
          content: "No person who, after the commencement of this Constitution, has held office as a permanent Judge of a High Court shall plead or act in any court or before any authority in India except the Supreme Court and the other High Courts."
        },
        {
          article: "Article 221",
          title: "Salaries, etc., of Judges",
          content: "The salaries, allowances and pensions payable to or in respect of the Judges of any High Court shall be charged on the Consolidated Fund of the State."
        },
        {
          article: "Article 222",
          title: "Transfer of a Judge from one High Court to another",
          content: "The President may, after consultation with the Chief Justice of India, transfer a Judge of a High Court from one High Court to another High Court."
        },
        {
          article: "Article 223",
          title: "Appointment of acting Chief Justice",
          content: "The President may appoint a Judge of a High Court to act as the Chief Justice of that High Court when the office of the Chief Justice of that High Court is vacant or when the Chief Justice is unable to perform his duties owing to absence, illness or any other cause."
        },
        {
          article: "Article 224",
          title: "Appointment of additional and acting Judges",
          content: "The President may, if he is of opinion that the number of the Judges of a High Court is not sufficient for the more expeditious disposal of the business of the High Court, appoint persons duly qualified to be appointed as Judges of the High Court to act as Judges of the High Court."
        },
        {
          article: "Article 225",
          title: "Jurisdiction of High Courts",
          content: "The jurisdiction of a High Court shall extend to all cases arising in the State in which the High Court has its principal seat, and to all cases arising in any other State which is notified by the President in this behalf."
        },
        {
          article: "Article 226",
          title: "Power of High Courts to issue certain writs",
          content: "Every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose."
        },
        {
          article: "Article 227",
          title: "Power of superintendence over all Courts by the High Court",
          content: "Every High Court shall have superintendence over all courts and tribunals throughout the territories in relation to which it exercises jurisdiction."
        },
        {
          article: "Article 228",
          title: "Transfer of certain cases",
          content: "If the High Court is satisfied that a case pending in any court subordinate to it involves a substantial question of law as to its interpretation which needs to be decided by the High Court, it may withdraw the case and may either: (a) dispose of the case itself; or (b) determine the said question of law and return the case to the court from which it has been withdrawn together with a copy of its judgment."
        },
        {
          article: "Article 229",
          title: "Officers and servants and the expenses of High Courts",
          content: "The Governor may, by rules, make provisions for regulating the recruitment, and the conditions of service of persons appointed, to the service of the High Court."
        },
        {
          article: "Article 230",
          title: "Extension of jurisdiction of High Courts to Union territories",
          content: "Parliament may by law extend the jurisdiction of a High Court to any Union territory or exclude the jurisdiction of a High Court from any Union territory."
        },
        {
          article: "Article 231",
          title: "Establishment of a common High Court for two or more States",
          content: "Notwithstanding anything contained in the preceding provisions of this Chapter, Parliament may by law establish a common High Court for two or more States and for a Union territory, and extend the jurisdiction of a High Court to any Union territory."
        },
        {
          article: "Article 232",
          title: "Interpretation",
          content: "In this Chapter, unless the context otherwise requires, 'High Court' means a High Court established under article 214."
        },
        {
          article: "Article 233",
          title: "Appointment of District Judges",
          content: "Appointment of persons to be, and the posting and promotion of, District Judges in any State shall be made by the Governor of the State in consultation with the High Court exercising jurisdiction in relation to such State."
        },
        {
          article: "Article 234",
          title: "Recruitment of persons other than District Judges to the judicial service",
          content: "Appointments of persons other than District Judges to the judicial service of a State shall be made by the Governor of the State in accordance with rules made by him in that behalf after consultation with the State Public Service Commission and the High Court exercising jurisdiction in relation to such State."
        },
        {
          article: "Article 235",
          title: "Control over subordinate courts",
          content: "The control over district courts and courts subordinate thereto, including the posting and promotion of, and the grant of leave to, persons belonging to the judicial service of a State holding any post inferior to the post of District Judge, shall be vested in the High Court."
        },
        {
          article: "Article 236",
          title: "Interpretation",
          content: "In this Chapter, unless the context otherwise requires, 'judicial service' means any service which is under the control of the High Court."
        },
        {
          article: "Article 237",
          title: "Application of the provisions of this Chapter to certain class of cases",
          content: "The provisions of this Chapter shall apply to any class of cases to which the provisions of this Chapter may be applied by an order made by the President."
        }
      ]
    },
    "Part VIII": {
      title: "Part VIII - The Union Territories",
      articles: "Articles 239-242",
      description: "Specifies administration of Union Territories, provisions regarding Union Territories with Legislatures, and special provisions for certain Union Territories.",
      articlesList: [
        {
          article: "Article 239",
          title: "Administration of Union territories",
          content: "Save as otherwise provided by Parliament by law, every Union territory shall be administered by the President acting, to such extent as he thinks fit, through an administrator to be appointed by him with such designation as he may specify."
        },
        {
          article: "Article 239A",
          title: "Creation of local Legislatures or Council of Ministers or both for certain Union territories",
          content: "Parliament may by law create for the Union territory of Pondicherry: (a) a body, either elected or partly nominated and partly elected, to function as a Legislature for the Union territory, or (b) a Council of Ministers consisting of such number of Ministers as may be specified in the law, with the Chief Minister at the head to aid and advise the Administrator in the exercise of his functions in relation to matters with respect to which the Legislature for the Union territory has power to make laws."
        },
        {
          article: "Article 239AA",
          title: "Special provisions with respect to Delhi",
          content: "As from the date of commencement of the Constitution (Sixty-ninth Amendment) Act, 1991, the Union territory of Delhi shall be called the National Capital Territory of Delhi and the Administrator thereof shall be designated as the Lieutenant Governor. The Legislative Assembly of the National Capital Territory of Delhi shall have power to make laws for the whole or any part of the National Capital Territory with respect to any of the matters enumerated in the State List or the Concurrent List."
        },
        {
          article: "Article 240",
          title: "Power of President to make regulations for certain Union territories",
          content: "The President may make regulations for the peace, progress and good government of the Union territory of Andaman and Nicobar Islands, Lakshadweep, Dadra and Nagar Haveli, Daman and Diu and Puducherry."
        },
        {
          article: "Article 241",
          title: "High Courts for Union territories",
          content: "Parliament may by law constitute a High Court for a Union territory or declare any court in any such territory to be a High Court for all or any of the purposes of this Constitution."
        },
        {
          article: "Article 242",
          title: "Interpretation",
          content: "In this Part, the expression 'High Court' means a High Court established under article 214."
        }
      ]
    },
    "Part IX": {
      title: "Part IX - The Panchayats",
      articles: "Articles 243-243-O",
      description: "Provides for the constitution of Panchayats, powers and functions of Panchayats, powers to impose taxes, and finance of Panchayats.",
      articlesList: [
        {
          article: "Article 243",
          title: "Definition of Gram Sabha",
          content: "Gram Sabha means a body consisting of persons registered in the electoral rolls relating to a village comprised within the area of Panchayat at the village level."
        },
        {
          article: "Article 243A",
          title: "Gram Sabha",
          content: "A Gram Sabha may exercise such powers and perform such functions at the village level as the Legislature of a State may, by law, provide."
        },
        {
          article: "Article 243B",
          title: "Constitution of Panchayats",
          content: "There shall be constituted in every State, Panchayats at the village, intermediate and district levels in accordance with the provisions of this Part. Notwithstanding anything in clause (1), Panchayats shall be constituted only in villages with a population of not less than five hundred."
        },
        {
          article: "Article 243C",
          title: "Composition of Panchayats",
          content: "All the seats in a Panchayat shall be filled by persons chosen by direct election from territorial constituencies in the Panchayat area and, for this purpose, each Panchayat area shall be divided into territorial constituencies as nearly equal in population as may be."
        },
        {
          article: "Article 243D",
          title: "Reservation of seats",
          content: "In a Panchayat, seats shall be reserved for: (a) Scheduled Castes; and (b) Scheduled Tribes, in proportion to their population in the Panchayat area. Not less than one-third of the total number of seats reserved for Scheduled Castes and Scheduled Tribes in a Panchayat shall be reserved for women belonging to Scheduled Castes or, as the case may be, Scheduled Tribes."
        },
        {
          article: "Article 243E",
          title: "Duration of Panchayats",
          content: "Every Panchayat, unless sooner dissolved under any law for the time being in force, shall continue for five years from the date appointed for its first meeting and no longer. No dissolution of a Panchayat shall affect the continuance of such Panchayat for the remainder of its term if it is elected in the place of the dissolved Panchayat."
        },
        {
          article: "Article 243F",
          title: "Disqualifications for membership",
          content: "A person shall be disqualified for being chosen as, and for being, a member of a Panchayat if he is so disqualified: (a) under any law for the time being in force for the purposes of elections to the Legislature of the State concerned; or (b) under any law made by the Legislature of the State."
        },
        {
          article: "Article 243G",
          title: "Powers, authority and responsibilities of Panchayats",
          content: "Subject to the provisions of this Constitution, the Legislature of a State may, by law, endow: (a) the Panchayats with such powers and authority as may be necessary to enable them to function as institutions of self-government; and (b) such Panchayats with such powers and authority as may be necessary to enable them to function as institutions of self-government and such law may contain provisions for the devolution of powers and responsibilities upon Panchayats."
        },
        {
          article: "Article 243H",
          title: "Powers to levy taxes and duties and to collect fees",
          content: "The Legislature of a State may, by law, authorize a Panchayat to levy, collect and appropriate such taxes, duties, tolls and fees in accordance with such procedure and subject to such limits as may be specified therein."
        },
        {
          article: "Article 243I",
          title: "Finance Commission",
          content: "The Governor of a State shall, as soon as may be within one year from the commencement of the Constitution (Seventy-third Amendment) Act, 1992, and thereafter at the expiration of every fifth year, constitute a Finance Commission to review the financial position of Panchayats."
        },
        {
          article: "Article 243J",
          title: "Audit of accounts",
          content: "The Legislature of a State may, by law, make provisions with respect to the maintenance of accounts by the Panchayats and the auditing of such accounts."
        },
        {
          article: "Article 243K",
          title: "Elections to the Panchayats",
          content: "The superintendence, direction and control of the preparation of electoral rolls for, and the conduct of, all elections to the Panchayats shall be vested in a State Election Commission consisting of a State Election Commissioner to be appointed by the Governor."
        },
        {
          article: "Article 243L",
          title: "Application to Union territories",
          content: "The provisions of this Part shall apply to the Union territories and shall, in their application to a Union territory, have effect as if the references to the Governor of a State were references to the Administrator of the Union territory appointed under article 239."
        },
        {
          article: "Article 243M",
          title: "Part not to apply to certain areas",
          content: "This Part shall not apply to the Scheduled Areas referred to in clause (1) of article 244 and the tribal areas referred to in clause (1) of article 244A."
        },
        {
          article: "Article 243N",
          title: "Continuance of existing laws and Panchayats",
          content: "Notwithstanding anything in this Part, any provision of any law relating to Panchayats in force in a State immediately before the commencement of the Constitution (Seventy-third Amendment) Act, 1992, which is inconsistent with the provisions of this Part shall continue to be in force until amended or repealed by a competent Legislature or other competent authority."
        },
        {
          article: "Article 243O",
          title: "Bar to interference by courts in electoral matters",
          content: "Notwithstanding anything in this Constitution: (a) no election to any Panchayat shall be called in question except by an election petition presented to such authority and in such manner as provided by or under any law made by the Legislature of a State; (b) no such election petition shall be entertained by any court or tribunal."
        }
      ]
    },
    "Part IX-A": {
      title: "Part IX-A - The Municipalities",
      articles: "Articles 243-P to 243-ZG",
      description: "Constitution of Municipalities, powers and functions of Municipalities, powers to impose taxes, and finance of Municipalities.",
      articlesList: [
        {
          article: "Article 243P",
          title: "Definitions",
          content: "In this Part, unless the context otherwise requires: (a) 'Committee' means a Committee constituted under article 243S; (b) 'district' means a district in a State; (c) 'Metropolitan area' means an area having a population of ten lakhs or more, comprised in one or more districts and consisting of two or more Municipalities or Panchayats or other contiguous areas, specified by the Governor by public notification to be a Metropolitan area for the purposes of this Part."
        },
        {
          article: "Article 243Q",
          title: "Constitution of Municipalities",
          content: "There shall be constituted in every State: (a) a Nagar Panchayat (by whatever name called) for a transitional area, that is to say, an area in transition from a rural area to an urban area; (b) a Municipal Council for a smaller urban area; and (c) a Municipal Corporation for a larger urban area, in accordance with the provisions of this Part."
        },
        {
          article: "Article 243R",
          title: "Composition of Municipalities",
          content: "All the seats in a Municipality shall be filled by persons chosen by direct election from territorial constituencies in the Municipality area and, for this purpose, each Municipal area shall be divided into territorial constituencies as nearly equal in population as may be."
        },
        {
          article: "Article 243S",
          title: "Constitution and composition of Wards Committees, etc.",
          content: "A Municipality having a population of three lakhs or more shall constitute Ward Committees consisting of one or more wards, within the territorial area of the Municipality having regard to the number of wards to be constituted in such Municipal area."
        },
        {
          article: "Article 243T",
          title: "Reservation of seats",
          content: "In a Municipality, seats shall be reserved for: (a) Scheduled Castes; and (b) Scheduled Tribes, in proportion to their population in the Municipality area. Not less than one-third of the total number of seats reserved for Scheduled Castes and Scheduled Tribes in a Municipality shall be reserved for women belonging to Scheduled Castes or, as the case may be, Scheduled Tribes."
        },
        {
          article: "Article 243U",
          title: "Duration of Municipalities",
          content: "Every Municipality, unless sooner dissolved under any law for the time being in force, shall continue for five years from the date appointed for its first meeting and no longer. No dissolution of a Municipality shall affect the continuance of such Municipality for the remainder of its term if it is elected in the place of the dissolved Municipality."
        },
        {
          article: "Article 243V",
          title: "Disqualifications for membership",
          content: "A person shall be disqualified for being chosen as, and for being, a member of a Municipality if he is so disqualified: (a) under any law for the time being in force for the purposes of elections to the Legislature of the State concerned; or (b) under any law made by the Legislature of the State."
        },
        {
          article: "Article 243W",
          title: "Powers, authority and responsibilities of Municipalities",
          content: "Subject to the provisions of this Constitution, the Legislature of a State may, by law, endow: (a) the Municipalities with such powers and authority as may be necessary to enable them to function as institutions of self-government; and (b) such Municipalities with such powers and authority as may be necessary to enable them to function as institutions of self-government and such law may contain provisions for the devolution of powers and responsibilities upon Municipalities."
        },
        {
          article: "Article 243X",
          title: "Powers to levy taxes and duties and to collect fees",
          content: "The Legislature of a State may, by law, authorize a Municipality to levy, collect and appropriate such taxes, duties, tolls and fees in accordance with such procedure and subject to such limits as may be specified therein."
        },
        {
          article: "Article 243Y",
          title: "Finance Commission",
          content: "The Finance Commission constituted under article 243-I shall also review the financial position of Municipalities and make recommendations to the Governor as to: (a) the principles which should govern: (i) the distribution between the States and the Municipalities of the net proceeds of taxes, duties, tolls and fees leviable by the State; (ii) the determination of the taxes, duties, tolls and fees which may be assigned to the Municipalities; and (iii) the grants-in-aid to the Municipalities from the Consolidated Fund of the State."
        },
        {
          article: "Article 243Z",
          title: "Audit of accounts",
          content: "The Legislature of a State may, by law, make provisions with respect to the maintenance of accounts by the Municipalities and the auditing of such accounts."
        },
        {
          article: "Article 243ZA",
          title: "Elections to the Municipalities",
          content: "The superintendence, direction and control of the preparation of electoral rolls for, and the conduct of, all elections to the Municipalities shall be vested in a State Election Commission consisting of a State Election Commissioner to be appointed by the Governor."
        },
        {
          article: "Article 243ZB",
          title: "Application to Union territories",
          content: "The provisions of this Part shall apply to the Union territories and shall, in their application to a Union territory, have effect as if the references to the Governor of a State were references to the Administrator of the Union territory appointed under article 239."
        },
        {
          article: "Article 243ZC",
          title: "Part not to apply to certain areas",
          content: "This Part shall not apply to the Scheduled Areas referred to in clause (1) of article 244 and the tribal areas referred to in clause (1) of article 244A."
        },
        {
          article: "Article 243ZD",
          title: "Continuance of existing laws and Municipalities",
          content: "Notwithstanding anything in this Part, any provision of any law relating to Municipalities in force in a State immediately before the commencement of the Constitution (Seventy-fourth Amendment) Act, 1992, which is inconsistent with the provisions of this Part shall continue to be in force until amended or repealed by a competent Legislature or other competent authority."
        },
        {
          article: "Article 243ZE",
          title: "Committee for district planning",
          content: "In every State having a population of not less than twenty lakhs, there shall be constituted a District Planning Committee to consolidate the plans prepared by the Panchayats and the Municipalities in the district and to prepare a draft development plan for the district as a whole."
        },
        {
          article: "Article 243ZF",
          title: "Committee for Metropolitan planning",
          content: "There shall be constituted in every Metropolitan area a Metropolitan Planning Committee to prepare a draft development plan for the Metropolitan area as a whole."
        },
        {
          article: "Article 243ZG",
          title: "Bar to interference by courts in electoral matters",
          content: "Notwithstanding anything in this Constitution: (a) no election to any Municipality shall be called in question except by an election petition presented to such authority and in such manner as provided by or under any law made by the Legislature of a State; (b) no such election petition shall be entertained by any court or tribunal."
        }
      ]
    },
    "Part X": {
      title: "Part X - The Scheduled and Tribal Areas",
      articles: "Articles 244-244-A",
      description: "Administration of Scheduled Areas and Tribal Areas, protection of interests of Scheduled Tribes, and provisions for tribal areas.",
      articlesList: [
        {
          article: "Article 244",
          title: "Administration of Scheduled Areas and Tribal Areas",
          content: "The provisions of the Fifth Schedule shall apply to the administration and control of Scheduled Areas and Scheduled Tribes in any State other than Assam, Meghalaya, Tripura and Mizoram. The provisions of the Sixth Schedule shall apply to the administration of the tribal areas in the States of Assam, Meghalaya, Tripura and Mizoram."
        },
        {
          article: "Article 244A",
          title: "Formation of an autonomous State comprising certain tribal areas in Assam and creation of local Legislature or Council of Ministers or both therefor",
          content: "Notwithstanding anything in this Constitution, Parliament may by law form within the State of Assam an autonomous State comprising all or any of the tribal areas specified in Part I of the table appended to paragraph 20 of the Sixth Schedule and create for the autonomous State: (a) a body, either elected or partly nominated and partly elected, to function as a Legislature for the autonomous State, or (b) a Council of Ministers consisting of such number of Ministers as may be specified in the law, with the Chief Minister at the head to aid and advise the Administrator in the exercise of his functions in relation to the autonomous State."
        }
      ]
    },
    "Part XI": {
      title: "Part XI - Relations between Union and States",
      articles: "Articles 245-263",
      description: "Distribution of legislative powers between Union and States, administrative relations, and financial relations between Union and States.",
      articlesList: [
        {
          article: "Article 245",
          title: "Extent of laws made by Parliament and by the Legislatures of States",
          content: "Subject to the provisions of this Constitution, Parliament may make laws for the whole or any part of the territory of India, and the Legislature of a State may make laws for the whole or any part of the State. No law made by Parliament shall be deemed to be invalid on the ground that it would have extra-territorial operation."
        },
        {
          article: "Article 246",
          title: "Subject-matter of laws made by Parliament and by the Legislatures of States",
          content: "Notwithstanding anything in clauses (2) and (3), Parliament has exclusive power to make laws with respect to any of the matters enumerated in List I in the Seventh Schedule (in this Part referred to as the Union List). Notwithstanding anything in clause (3), Parliament, and, subject to clause (1), the Legislature of any State also, have power to make laws with respect to any of the matters enumerated in List III in the Seventh Schedule (in this Part referred to as the Concurrent List)."
        },
        {
          article: "Article 247",
          title: "Power of Parliament to make laws with respect to any matter in the State List if a Proclamation of Emergency is in operation",
          content: "Notwithstanding anything in articles 246 and 254, Parliament may make laws with respect to any matter enumerated in the State List if a Proclamation of Emergency is in operation."
        },
        {
          article: "Article 248",
          title: "Residuary powers of legislation",
          content: "Parliament has exclusive power to make any law with respect to any matter not enumerated in the Concurrent List or State List."
        },
        {
          article: "Article 249",
          title: "Power of Parliament to legislate with respect to a matter in the State List in the national interest",
          content: "If it appears to Parliament that the provisions of any law made by the Legislature of a State relating to a matter enumerated in the State List are necessary for securing uniformity of law throughout India, Parliament may make laws with respect to that matter."
        },
        {
          article: "Article 250",
          title: "Power of Parliament to legislate with respect to any matter in the State List if a Proclamation of Emergency is in operation",
          content: "While a Proclamation of Emergency is in operation, Parliament may make laws with respect to any matter enumerated in the State List."
        },
        {
          article: "Article 251",
          title: "Inconsistency between laws made by Parliament under articles 249 and 250 and laws made by the Legislatures of States",
          content: "If any provision of a law made by the Legislature of a State with respect to any matter enumerated in the Concurrent List or State List is repugnant to any provision of a law made by Parliament which Parliament is competent to make under articles 249 and 250, then the law made by Parliament, whether passed before or after the law made by the Legislature of the State, shall prevail."
        },
        {
          article: "Article 252",
          title: "Power of Parliament to legislate for two or more States by consent and adoption of such legislation by any other State",
          content: "If it appears to the Legislatures of two or more States to be desirable that any of the matters with respect to which Parliament has no power to make laws for the States enumerated in the State List should be regulated in such States by Parliament by law, and if the Legislatures of those States by resolutions passed in that behalf consent to Parliament making laws with respect to those matters, then Parliament may by law regulate any of those matters for all or any of those States."
        }
      ]
    },
    "Part XII": {
      title: "Part XII - Finance, Property, Contracts and Suits",
      articles: "Articles 264-300-A",
      description: "Property of the Union and States, borrowing by Union and States, property contracts, rights, liabilities and suits, and legal proceedings.",
      articlesList: [
        {
          article: "Article 264",
          title: "Interpretation",
          content: "In this Part, unless the context otherwise requires, 'taxation' includes taxes and duties."
        },
        {
          article: "Article 265",
          title: "Taxes not to be imposed save by authority of law",
          content: "No tax shall be levied or collected except by authority of law."
        },
        {
          article: "Article 266",
          title: "Consolidated Funds and public accounts of India and of the States",
          content: "All revenues received by the Government of India and all loans raised by that Government and all moneys received by that Government in repayment of loans shall form one consolidated fund to be called the Consolidated Fund of India. All other public moneys received by or on behalf of the Government of India shall be credited to the Public Account of India."
        },
        {
          article: "Article 267",
          title: "Contingency Fund of India",
          content: "Parliament may by law establish a Contingency Fund of India and shall determine the persons who shall be authorized to make advances from that Fund."
        },
        {
          article: "Article 268",
          title: "Duties levied by the Union but collected and appropriated by the States",
          content: "Such duties of customs as may be imposed by Parliament and such duties of excise on goods as may be imposed by the Union and collected as may be prescribed by law shall be collected and retained by the State in which they are levied."
        },
        {
          article: "Article 269",
          title: "Taxes levied and collected by the Union but assigned to the States",
          content: "Such taxes as may be imposed by the Union and collected as may be prescribed by law shall be assigned to the States in which they are levied."
        },
        {
          article: "Article 270",
          title: "Taxes levied and distributed between Union and the States",
          content: "Such taxes as may be imposed by the Union and collected as may be prescribed by law shall be distributed between the Union and the States in the manner provided in clause (2)."
        },
        {
          article: "Article 271",
          title: "Surcharge on certain duties and taxes for purposes of the Union",
          content: "Parliament may at any time increase any of the duties or taxes referred to in articles 269 and 270 by a surcharge for purposes of the Union and the whole proceeds of any such surcharge shall form part of the Consolidated Fund of India."
        },
        {
          article: "Article 272",
          title: "Taxes which are levied and collected by the Union and may be distributed between Union and the States",
          content: "Such taxes as may be imposed by the Union and collected as may be prescribed by law shall be distributed between the Union and the States in the manner provided in clause (2)."
        },
        {
          article: "Article 273",
          title: "Grants in lieu of export duty on jute and jute products",
          content: "Parliament may by law provide for the payment of such sums as may be determined by Parliament in respect of export duty on jute and jute products to the State of West Bengal."
        },
        {
          article: "Article 274",
          title: "Prior recommendation of President required to Bills affecting taxation in which States are interested",
          content: "No Bill or amendment for the purposes of clause (1) shall be introduced or moved in either House of Parliament except on the recommendation of the President."
        },
        {
          article: "Article 275",
          title: "Grants from the Union to certain States",
          content: "Such sums as Parliament may by law provide shall be charged on the Consolidated Fund of India in each year as grants-in-aid of the revenues of such States as Parliament may determine to be in need of assistance."
        },
        {
          article: "Article 276",
          title: "Taxes on professions, trades, callings and employments",
          content: "Notwithstanding anything in article 271, a law of a State may impose, and Parliament may by law impose, a tax on professions, trades, callings and employments."
        },
        {
          article: "Article 277",
          title: "Savings of laws on taxes on professions, trades, callings and employments",
          content: "Every law in force immediately before the commencement of this Constitution in any State which imposes, or authorizes the imposition of, a tax on professions, trades, callings and employments shall, notwithstanding anything in this Constitution, continue to be in force until amended or repealed by a competent Legislature or other competent authority."
        },
        {
          article: "Article 278",
          title: "Agreement with States with respect to compensation for tax adjustments",
          content: "The Union may enter into agreements with the States with respect to the compensation to be paid to the States for any loss of revenue which may be incurred by them in consequence of the imposition of any tax or duty by the Union."
        },
        {
          article: "Article 279",
          title: "Calculation of net proceeds, etc.",
          content: "The net proceeds of taxes and duties in any year shall be determined in accordance with such method as may be prescribed by law made by Parliament."
        },
        {
          article: "Article 280",
          title: "Finance Commission",
          content: "The President shall, within two years from the commencement of this Constitution and thereafter at the expiration of every fifth year or at such earlier time as the President considers necessary, by order constitute a Finance Commission to make recommendations to the President as to: (a) the distribution between the Union and the States of the net proceeds of taxes; (b) the principles which should govern the grants-in-aid of the revenues of the States out of the Consolidated Fund of India."
        }
      ]
    },
    "Part XIII": {
      title: "Part XIII - Trade, Commerce and Intercourse within the Territory of India",
      articles: "Articles 301-307",
      description: "Freedom of trade, commerce and intercourse, restrictions on trade, commerce and intercourse, and provisions regarding taxes.",
      articlesList: [
        {
          article: "Article 301",
          title: "Freedom of trade, commerce and intercourse",
          content: "Subject to the other provisions of this Part, trade, commerce and intercourse throughout the territory of India shall be free."
        },
        {
          article: "Article 302",
          title: "Power of Parliament to impose restrictions on trade, commerce and intercourse",
          content: "Parliament may by law impose such restrictions on the freedom of trade, commerce or intercourse between one State and another or within any part of the territory of India as may be necessary in the public interest."
        },
        {
          article: "Article 303",
          title: "Restrictions on the legislative powers of the Union and of the States with regard to trade and commerce",
          content: "Notwithstanding anything in article 302, neither Parliament nor the Legislature of a State shall have power to make any law which: (a) restricts trade, commerce or intercourse between one State and another; or (b) discriminates between one State and another, in respect of any trade, commerce or intercourse."
        },
        {
          article: "Article 304",
          title: "Restrictions on trade, commerce and intercourse in the public interest",
          content: "Notwithstanding anything in articles 301 and 303, the Legislature of a State may by law: (a) impose on goods imported from other States or the Union territories any tax to which similar goods manufactured or produced in that State are subject, so, however, as not to discriminate between goods so imported and goods so manufactured or produced; and (b) impose such reasonable restrictions on the freedom of trade, commerce or intercourse with or within that State as may be required in the public interest."
        },
        {
          article: "Article 305",
          title: "Saving of existing laws and laws providing for State monopolies",
          content: "Nothing in articles 301 and 303 shall affect the provisions of any existing law except insofar as the President may by order otherwise direct; and nothing in article 303 shall affect the provisions of any law made by the Legislature of a State for the purpose of dealing with any matter of public order, public morality or public health."
        },
        {
          article: "Article 306",
          title: "Power to impose restrictions on trade, commerce and intercourse in the public interest",
          content: "Notwithstanding anything in articles 301 and 303, the Legislature of a State may by law impose such reasonable restrictions on the freedom of trade, commerce or intercourse with or within that State as may be required in the public interest."
        },
        {
          article: "Article 307",
          title: "Appointment of authority for carrying out the purposes of articles 301 to 304",
          content: "Parliament may by law appoint such authority as it considers appropriate for carrying out the purposes of articles 301, 302, 303 and 304, and confer on the authority so appointed such powers and duties as the Parliament may deem necessary."
        }
      ]
    },
    "Part XIV": {
      title: "Part XIV - Services under the Union and the States",
      articles: "Articles 308-323",
      description: "Recruitment and conditions of service of persons serving the Union or the States, tenure of office, and removal from service.",
      articlesList: [
        {
          article: "Article 308",
          title: "Interpretation",
          content: "In this Part, unless the context otherwise requires, 'State' does not include the State of Jammu and Kashmir."
        },
        {
          article: "Article 309",
          title: "Recruitment and conditions of service of persons serving the Union or a State",
          content: "Subject to the provisions of this Constitution, Acts of the appropriate Legislature may regulate the recruitment and conditions of service of persons appointed to public services and posts in connection with the affairs of the Union or of any State."
        },
        {
          article: "Article 310",
          title: "Tenure of office of persons serving the Union or a State",
          content: "Except as expressly provided by this Constitution, every person who is a member of a defence service or of a civil service of the Union or of an all-India service or holds any post connected with defence or any civil post under the Union, holds office during the pleasure of the President."
        },
        {
          article: "Article 311",
          title: "Dismissal, removal or reduction in rank of persons employed in civil capacities under the Union or a State",
          content: "No person who is a member of a civil service of the Union or an all-India service or a civil service of a State or holds a civil post under the Union or a State shall be dismissed or removed by an authority subordinate to that by which he was appointed."
        },
        {
          article: "Article 312",
          title: "All-India services",
          content: "Parliament may by law create one or more all-India services common to the Union and the States, and, if it does so, make provision for the regulation of the recruitment and the conditions of service of persons appointed to such services."
        },
        {
          article: "Article 313",
          title: "Provision as to temporary suspension of rules",
          content: "Until provision is made by Parliament under clause (1) of article 312, the rules in force immediately before the commencement of this Constitution with respect to the conditions of service of persons appointed to any of the services mentioned in that clause shall continue to be in force."
        },
        {
          article: "Article 314",
          title: "Provision as to posts and emoluments of judges and certain other officers",
          content: "Notwithstanding anything in the foregoing provisions of this Part, the President may, by order, make provision as to the posts and emoluments of judges and of certain other officers."
        },
        {
          article: "Article 315",
          title: "Public Service Commissions for the Union and for the States",
          content: "There shall be a Public Service Commission for the Union and a Public Service Commission for each State. Two or more States may agree that there shall be a single Public Service Commission for that group of States, and if a resolution to that effect is passed by the House or, where there are two Houses, by each House of the Legislature of each of those States, Parliament may by law provide for the appointment of a Joint State Public Service Commission to serve the needs of those States."
        },
        {
          article: "Article 316",
          title: "Appointment and term of office of members",
          content: "The Chairman and other Members of a Public Service Commission shall be appointed, in the case of the Union Commission or a Joint Commission, by the President, and in the case of a State Commission, by the Governor of the State. A Member of a Public Service Commission shall hold office until he attains the age of sixty-two years in the case of the Union Commission or a Joint Commission and sixty years in the case of a State Commission."
        },
        {
          article: "Article 317",
          title: "Removal and suspension of a member of a Public Service Commission",
          content: "The Chairman or any other Member of a Public Service Commission may be removed from his office by the President in the case of the Union Commission or a Joint Commission and by the Governor in the case of a State Commission, on the ground of misbehaviour after the Supreme Court, on reference being made to it by the President, has on inquiry reported that the Chairman or such other Member ought on any such ground to be removed."
        },
        {
          article: "Article 318",
          title: "Power to make regulations as to conditions of service of members and staff of the Commission",
          content: "The President may, after consultation with the Governors of the States concerned, make regulations as to the conditions of service of the Chairman and other Members of a Public Service Commission and of the staff of the Commission."
        },
        {
          article: "Article 319",
          title: "Prohibition as to the holding of offices by members of Commission on ceasing to be such members",
          content: "On ceasing to hold office, the Chairman of a Public Service Commission shall be ineligible for further employment under the Government of India or the Government of any State."
        },
        {
          article: "Article 320",
          title: "Functions of Public Service Commissions",
          content: "It shall be the duty of the Union and the State Public Service Commissions to conduct examinations for appointments to the services of the Union and the services of the States respectively. It shall also be the duty of the Union and the State Public Service Commissions to be consulted on all matters relating to: (a) methods of recruitment to civil services and for civil posts; (b) principles to be followed in making appointments to civil services and posts; (c) principles to be followed in making promotions and transfers from one civil service or post to another; (d) suitability of candidates for appointment to civil services and posts."
        },
        {
          article: "Article 321",
          title: "Power to extend functions of Public Service Commissions",
          content: "An Act made by Parliament or, as the case may be, a law made by the Legislature of a State may provide for the exercise of additional functions by the Union Public Service Commission or the State Public Service Commission as the case may be."
        },
        {
          article: "Article 322",
          title: "Expenses of Public Service Commissions",
          content: "The expenses of the Union or a State Public Service Commission, including any salaries, allowances and pensions payable to or in respect of the Members or staff of the Commission, shall be charged on the Consolidated Fund of India or, as the case may be, the Consolidated Fund of the State."
        },
        {
          article: "Article 323",
          title: "Reports of Public Service Commissions",
          content: "It shall be the duty of a Public Service Commission to present annually to the Governor a report as to the work done by the Commission and such report shall be laid before the State Legislature."
        }
      ]
    },
    "Part XIV-A": {
      title: "Part XIV-A - Tribunals",
      articles: "Articles 323-A to 323-B",
      description: "Administrative tribunals for disputes concerning recruitment and conditions of service of persons appointed to public services, and tribunals for other matters.",
      articlesList: [
        {
          article: "Article 323-A",
          title: "Administrative tribunals",
          content: "Parliament may by law provide for the adjudication or trial by administrative tribunals of disputes and complaints with respect to recruitment and conditions of service of persons appointed to public services and posts in connection with the affairs of the Union or of any State or of any local or other authority within the territory of India or under the control of the Government of India or of any corporation owned or controlled by the Government."
        },
        {
          article: "Article 323-B",
          title: "Tribunals for other matters",
          content: "Parliament may by law constitute tribunals for other matters and may, by law, provide for the establishment of a hierarchy of tribunals and specify the jurisdiction, powers and authority which may be exercised by each of the tribunals so constituted."
        }
      ]
    },
    "Part XV": {
      title: "Part XV - Elections",
      articles: "Articles 324-329-A",
      description: "Superintendence, direction and control of elections, election commissions, and provisions regarding elections to Parliament and State Legislatures.",
      articlesList: [
                        {
          article: "Article 324",
          title: "Superintendence, direction and control of elections",
          content: "The superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislatures of the States and of elections to the offices of President and Vice-President held under this Constitution shall be vested in a Election Commission."
        },
        {
          article: "Article 325",
          title: "No person to be ineligible for inclusion in electoral roll on grounds of religion, race, caste or sex",
          content: "No person to be ineligible for inclusion in electoral roll on grounds of religion, race, caste or sex."
        },
        {
          article: "Article 326",
          title: "Elections to the House of the People and to the Legislative Assemblies of States to be on the basis of adult suffrage",
          content: "The elections to the House of the People and to the Legislative Assemblies of States shall be on the basis of adult suffrage; that is to say, every person who is a citizen of India and who is not less than eighteen years of age on such date as may be fixed in that behalf by or under any law made by the appropriate Legislature and is not otherwise disqualified under this Constitution or any law made by the appropriate Legislature on the ground of non-residence, unsoundness of mind, crime, corrupt or illegal practice, shall be entitled to be registered as a voter at any such election."
        },
        {
          article: "Article 327",
          title: "Power of Parliament to make provision with respect to elections to Legislatures",
          content: "Subject to the provisions of this Constitution, Parliament may from time to time by law make provision with respect to all matters relating to elections to either House of Parliament or to the House or either House of the Legislature of a State, including the delimitation of constituencies and the allotment of seats to such constituencies."
        },
        {
          article: "Article 328",
          title: "Power of Legislature of a State to make provision with respect to elections to such Legislature",
          content: "Subject to the provisions of this Constitution, the Legislature of a State may from time to time by law make provision with respect to all matters relating to elections to the House or either House of the Legislature of the State, including the delimitation of constituencies and the allotment of seats to such constituencies."
        },
        {
          article: "Article 329",
          title: "Bar to interference by courts in electoral matters",
          content: "Notwithstanding anything in this Constitution: (a) no election to either House of Parliament or to the House or either House of the Legislature of a State shall be called in question except by an election petition presented to such authority and in such manner as may be provided for by or under any law made by the appropriate Legislature; and (b) no such election petition shall be entertained by any court or tribunal."
        },
        {
          article: "Article 329-A",
          title: "Special provisions for certain elections",
          content: "Notwithstanding anything contained in this Constitution, no law made by the Legislature of a State relating to the delimitation of constituencies for the purposes of elections to the Legislative Assembly of the State shall be deemed to be invalid on the ground that it results in the delimitation of constituencies which are not equal in population."
        }
      ]
    },
    "Part XVI": {
      title: "Part XVI - Special Provisions Relating to Certain Classes",
      articles: "Articles 330-342",
      description: "Reservation of seats for Scheduled Castes, Scheduled Tribes, and Anglo-Indian community in Legislatures, representation of the Anglo-Indian community, and special provisions for certain classes.",
      articlesList: [
        {
          article: "Article 330",
          title: "Reservation of seats for Scheduled Castes and Scheduled Tribes in the House of the People",
          content: "Seats shall be reserved in the House of the People for: (a) the Scheduled Castes; and (b) the Scheduled Tribes, in accordance with such system of proportional representation as may be prescribed by law."
        },
        {
          article: "Article 331",
          title: "Representation of the Anglo-Indian community in the House of the People",
          content: "Notwithstanding anything in article 81, the President may, if he is of opinion that the Anglo-Indian community is not adequately represented in the House of the People, nominate not more than two members of that community to the House of the People."
        },
        {
          article: "Article 332",
          title: "Reservation of seats for Scheduled Castes and Scheduled Tribes in State Legislatures",
          content: "Seats shall be reserved in the Legislative Assemblies of the States for: (a) the Scheduled Castes; and (b) the Scheduled Tribes, in accordance with such system of proportional representation as may be prescribed by law."
        },
        {
          article: "Article 333",
          title: "Representation of the Anglo-Indian community in the Legislative Assemblies of the States",
          content: "Notwithstanding anything in article 170, the Governor of a State may, if he is of opinion that the Anglo-Indian community is not adequately represented in the Legislative Assembly of the State, nominate one member of that community to the Legislative Assembly of the State."
        },
        {
          article: "Article 334",
          title: "Reservation of seats and special representation to cease after certain period",
          content: "The provisions of this article relating to the representation of the Anglo-Indian community in the House of the People and the Legislative Assemblies of the States shall cease to have effect on the expiration of a period of forty years from the commencement of this Constitution."
        },
        {
          article: "Article 335",
          title: "Claims of Scheduled Castes and Scheduled Tribes to services and posts",
          content: "The claims of the members of the Scheduled Castes and the Scheduled Tribes shall be taken into consideration, consistently with the requirements of maintenance of efficiency of administration, in the making of appointments to services and posts in connection with the affairs of the Union or of a State."
        },
        {
          article: "Article 336",
          title: "Special provision for Anglo-Indian community in certain services",
          content: "During the first ten years after the commencement of this Constitution, posts in the Union and the States shall be reserved for members of the Anglo-Indian community in such proportion as may be considered necessary by the President."
        },
        {
          article: "Article 337",
          title: "Special provision with respect to educational grants for the benefit of Anglo-Indian community",
          content: "The President may, for the purpose of promoting the educational interests of the Anglo-Indian community, make such provision as he thinks fit for the educational grants to such community."
        },
        {
          article: "Article 338",
          title: "National Commission for Scheduled Castes",
          content: "There shall be a Commission for the Scheduled Castes to be known as the National Commission for the Scheduled Castes to be appointed by the President by warrant under his hand and seal."
        },
        {
          article: "Article 338-A",
          title: "National Commission for Scheduled Tribes",
          content: "There shall be a Commission for the Scheduled Tribes to be known as the National Commission for the Scheduled Tribes to be appointed by the President by warrant under his hand and seal."
        },
        {
          article: "Article 339",
          title: "Control of the Union over the administration of Scheduled Areas and the welfare of Scheduled Tribes",
          content: "The President may make regulations for the peace and good government of any Scheduled Area or any part thereof in the Union and in respect of any State having Scheduled Areas therein and may, by regulation, make provision for the administration of such areas."
        },
        {
          article: "Article 340",
          title: "Appointment of a Commission to investigate the conditions of backward classes",
          content: "The President may, by order, appoint a Commission consisting of such persons as he thinks fit to investigate the conditions of socially and educationally backward classes within the territory of India and the difficulties under which they labour and to make recommendations as to the steps that should be taken by the Union or any State for the removal of such difficulties and to improve their condition."
        },
        {
          article: "Article 341",
          title: "Scheduled Castes",
          content: "The President may by public notification specify the castes, races or tribes or parts of or groups within castes, races or tribes which shall for the purposes of this Constitution be deemed to be Scheduled Castes in relation to a State."
        },
        {
          article: "Article 342",
          title: "Scheduled Tribes",
          content: "The President may by public notification specify the tribes or tribal communities or parts of or groups within tribes or tribal communities which shall for the purposes of this Constitution be deemed to be Scheduled Tribes in relation to a State."
        }
      ]
    },
    "Part XVII": {
      title: "Part XVII - Official Language",
      articles: "Articles 343-351",
      description: "Language of the Union, regional languages, special provisions for linguistic minorities, and official language for communication between states and union.",
      articlesList: [
        {
          article: "Article 343",
          title: "Official language of the Union",
          content: "The official language of the Union shall be Hindi in Devanagari script. The form of numerals to be used for official purposes of the Union shall be the international form of Indian numerals."
        },
        {
          article: "Article 344",
          title: "Commission and Committee of Parliament on official language",
          content: "The President shall, at the expiration of five years from the commencement of this Constitution and thereafter at the expiration of ten years from such commencement, by order constitute a Commission which shall consist of a Chairman and such other members representing the different languages specified in the Eighth Schedule as the President may appoint."
        },
        {
          article: "Article 345",
          title: "Official language or languages of a State",
          content: "Subject to the provisions of articles 346 and 347, the Legislature of a State may by law adopt any one or more of the languages in use in the State or Hindi as the language or languages to be used for all or any of the official purposes of that State."
        },
        {
          article: "Article 346",
          title: "Official language for communication between one State and another or between a State and the Union",
          content: "The language for the time being authorized for use in the Union for official purposes shall be the official language for communication between one State and another State and between a State and the Union."
        },
        {
          article: "Article 347",
          title: "Special provision relating to language spoken by a section of the population of a State",
          content: "On a demand being made in that behalf to the President, the President may, if he is satisfied that a substantial proportion of the population of a State desire the use of any language spoken by them to be recognized by that language being included in the Eighth Schedule, direct that such language shall also be officially recognized throughout that State or any part thereof for such purpose as he may specify."
        },
        {
          article: "Article 348",
          title: "Language to be used in Supreme Court and High Courts",
          content: "Until Parliament by law provides otherwise, all proceedings in the Supreme Court and in every High Court shall be in the English language."
        },
        {
          article: "Article 349",
          title: "Special procedure for enactment of certain laws relating to language",
          content: "During the period of fifteen years from the commencement of this Constitution, no Bill or amendment for the purposes of clause (1) of article 348 shall be introduced or moved in either House of Parliament except on the recommendation of the President."
        },
        {
          article: "Article 350",
          title: "Language to be used in representations for redress of grievances",
          content: "Every person shall be entitled to submit a representation for the redress of any grievance and to have such representation considered and any action taken thereon in accordance with law and the procedure established therefor."
        },
        {
          article: "Article 350-A",
          title: "Facilities for instruction in mother-tongue at primary stage",
          content: "It shall be the endeavour of every State and of every local authority within the State to provide adequate facilities for instruction in the mother-tongue at the primary stage of education to children belonging to linguistic minority groups."
        },
        {
          article: "Article 351",
          title: "Directive for development of the Hindi language",
          content: "It shall be the duty of the Union to promote the spread of the Hindi language, to develop it so that it may serve as a medium of expression for all the elements of the composite culture of India and to secure its enrichment by assimilating without interfering with its genius, the forms, style and expressions used in Hindustani and in the other languages of India specified in the Eighth Schedule."
        }
      ]
    },
    "Part XVIII": {
      title: "Part XVIII - Emergency Provisions",
      articles: "Articles 352-360",
      description: "Provisions for national emergency, state emergency, and financial emergency, effects of emergency provisions, and suspension of fundamental rights during emergency.",
      articlesList: [
        {
          article: "Article 352",
          title: "Proclamation of Emergency",
          content: "If the President is satisfied that a grave emergency exists whereby the security of India or of any part thereof is threatened, whether by war or external aggression or armed rebellion, he may, by proclamation, make a declaration to that effect."
        },
        {
          article: "Article 353",
          title: "Effect of Proclamation of Emergency",
          content: "While a Proclamation of Emergency is in operation, the executive power of the Union shall extend to the giving of directions to any State as to the exercise of the executive power of the State in the matters specified in clause (1)."
        },
        {
          article: "Article 354",
          title: "Application of provisions relating to distribution of revenues while a Proclamation of Emergency is in operation",
          content: "While a Proclamation of Emergency is in operation, the President may, by order, make a proclamation as to the distribution of the revenues between the Union and the States."
        },
        {
          article: "Article 355",
          title: "Duty of the Union to protect States against external aggression and internal disturbance",
          content: "It shall be the duty of the Union to protect every State against external aggression and internal disturbance and to ensure that the government of every State is carried on in accordance with the provisions of this Constitution."
        },
        {
          article: "Article 356",
          title: "Provisions in case of failure of constitutional machinery in States",
          content: "If the President, on receipt of a report from the Governor of a State or otherwise, is satisfied that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of this Constitution, the President may issue a proclamation to that effect."
        },
        {
          article: "Article 357",
          title: "Exercise of legislative powers under Proclamation issued under article 356",
          content: "In the event of a proclamation being issued under article 356, the President may, by proclamation, assume to himself all or any of the functions of the Government of the State and all powers vested in or exercisable by the Governor or any body or authority in the State other than the Legislature of the State."
        },
        {
          article: "Article 358",
          title: "Suspension of provisions of article 19 during emergencies",
          content: "While a Proclamation of Emergency declaring that the security of India or any part thereof is threatened by war or external aggression is in operation, nothing in article 19 shall restrict the power of the State as defined in article 12 to make any law or to take any executive action which the State considers necessary for the defence of India or any part thereof."
        },
        {
          article: "Article 359",
          title: "Suspension of the enforcement of the rights conferred by Part III during emergencies",
          content: "Where a Proclamation of Emergency is in operation, the President may by order declare that the right to move any court for the enforcement of such of the rights conferred by Part III as may be mentioned in the order shall remain suspended."
        },
        {
          article: "Article 360",
          title: "Provision as to financial emergency",
          content: "If the President is satisfied that a situation has arisen whereby the financial stability or credit of India or of any part thereof is threatened, he may, by proclamation, make a declaration to that effect."
        }
      ]
    },
    "Part XIX": {
      title: "Part XIX - Miscellaneous",
      articles: "Articles 361-367",
      description: "Protection of President and Governors, special provisions for certain states, and miscellaneous provisions.",
      articlesList: [
        {
          article: "Article 361",
          title: "Protection of President and Governors and Rajpramukhs",
          content: "The President, or the Governor or Rajpramukh of a State, shall not be answerable to any court for the exercise and performance of the powers and duties of his office or for any act done or purporting to be done by him in the exercise and performance of those powers and duties."
        },
        {
          article: "Article 361-A",
          title: "Protection of publication of proceedings of Parliament and State Legislatures",
          content: "No person shall be liable to any proceedings in any court in respect of the publication in a newspaper of a substantially true report of any proceedings of either House of Parliament or of the Legislative Assembly, or, as the case may be, the Legislative Council of a State."
        },
        {
          article: "Article 362",
          title: "Protection of judges of the Supreme Court and the High Courts",
          content: "No judge of the Supreme Court or of a High Court shall, after his appointment, hold any office of profit or be connected with any political party or be engaged in any other employment."
        },
        {
          article: "Article 363",
          title: "Bar to interference by courts in disputes arising out of certain treaties, agreements, engagements, etc.",
          content: "No court shall have jurisdiction to entertain any dispute arising out of any treaty, agreement, engagement, or other similar instrument which was entered into or executed before the commencement of this Constitution by any Ruler of an Indian State."
        },
        {
          article: "Article 364",
          title: "Special provision as to major ports and aerodromes",
          content: "Notwithstanding anything in article 246, the President may by law make provision with respect to any matter relating to major ports, aerodromes or other transport facilities."
        },
        {
          article: "Article 365",
          title: "Effect of failure to comply with, or to give effect to, directions given by the Union",
          content: "Where any State has failed to comply with, or to give effect to, any directions given in the exercise of the executive power of the Union under any of the provisions of this Constitution, it shall be lawful for the President to hold that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of this Constitution."
        },
        {
          article: "Article 366",
          title: "Definitions",
          content: "In this Constitution, unless the context otherwise requires, the following expressions have the meanings hereby respectively assigned to them, that is to say: (a) 'agricultural income' means agricultural income as defined for the purposes of the purposes of the Income-tax Act, 1961; (b) 'an Anglo-Indian' means a person whose father or any of whose other male progenitors in the male line is or was of European descent but who is domiciled within the territory of India and is or was born within such territory of parents habitually resident therein and not established there for temporary purposes only."
        },
        {
          article: "Article 367",
          title: "Interpretation",
          content: "In this Constitution, unless the context otherwise requires: (a) words importing the masculine gender shall also include females; (b) words in the singular shall include the plural, and words in the plural shall include the singular; (c) the word 'State' shall include the Union and the States, and a Union territory shall be deemed to be a State for the purposes of this Constitution."
        }
      ]
    },
    "Part XX": {
      title: "Part XX - Amendment of the Constitution",
      articles: "Article 368",
      description: "Power of Parliament to amend the Constitution and procedure for amendment.",
      articlesList: [
        {
          article: "Article 368",
          title: "Power of Parliament to amend the Constitution and procedure therefor",
          content: "An amendment of this Constitution may be initiated only by the introduction of a Bill for the purpose in either House of Parliament, and when the Bill is passed in each House by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting, it shall be presented to the President who shall give his assent to the Bill and thereupon the Constitution shall stand amended in accordance with the terms of the Bill."
        }
      ]
    },
    "Part XXI": {
      title: "Part XXI - Temporary, Transitional and Special Provisions",
      articles: "Articles 369-392",
      description: "Temporary provisions regarding states, special provisions for certain states, and transitional provisions.",
      articlesList: [
        {
          article: "Article 369",
          title: "Temporary power to Parliament to make laws with respect to certain matters in the State List as if they were matters in the Concurrent List",
          content: "Notwithstanding anything in this Constitution, Parliament may, by law, make provision with respect to any matter relating to any State which is specified in the State List and which is not enumerated in the Concurrent List, as if it were a matter enumerated in the Concurrent List."
        },
        {
          article: "Article 370",
          title: "Temporary provisions with respect to the State of Jammu and Kashmir",
          content: "Notwithstanding anything in this Constitution: (a) provisions of this Constitution in respect of the State of Jammu and Kashmir shall be applicable only to the extent that they are applicable to any other State in the Union; and (b) such other provisions as the President may by order specify."
        },
        {
          article: "Article 371",
          title: "Special provision with respect to the States of Maharashtra and Gujarat",
          content: "Notwithstanding anything in this Constitution, the President may, for the purposes of this Constitution, by order, make such provision as he thinks fit for the establishment of a separate Development Board for the State of Maharashtra and Gujarat."
        },
        {
          article: "Article 371-A",
          title: "Special provision with respect to the State of Nagaland",
          content: "Notwithstanding anything in this Constitution, no Act of Parliament in respect of: (a) religious or social practices of the Nagas; (b) Naga customary law and procedure; (c) administration of civil and criminal justice involving decisions according to Naga customary law; (d) ownership and transfer of land and its resources, shall apply to the State of Nagaland unless the Legislative Assembly of Nagaland by a resolution so decides."
        },
        {
          article: "Article 371-B",
          title: "Special provision with respect to the State of Assam",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the constitution of a Committee of the Legislative Assembly of the State of Assam consisting of members of that Assembly elected from the tribal areas specified in the Sixth Schedule and of members of that Assembly elected from the remaining parts of that State."
        },
        {
          article: "Article 371-C",
          title: "Special provision with respect to the State of Manipur",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the constitution of a Committee of the Legislative Assembly of the State of Manipur consisting of members of that Assembly elected from the hill areas of that State."
        },
        {
          article: "Article 371-D",
          title: "Special provisions with respect to the State of Andhra Pradesh",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of an administrative tribunal for the State of Andhra Pradesh to exercise such jurisdiction and powers as may be specified in the order."
        },
        {
          article: "Article 371-E",
          title: "Special provisions with respect to the States of Sikkim",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Sikkim."
        },
                        {
          article: "Article 371-F",
          title: "Special provisions with respect to the State of Mizoram",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Mizoram."
        },
        {
          article: "Article 371-G",
          title: "Special provisions with respect to the State of Arunachal Pradesh",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Arunachal Pradesh."
        },
        {
          article: "Article 371-H",
          title: "Special provisions with respect to the State of Goa",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Goa."
        },
        {
          article: "Article 371-I",
          title: "Special provisions with respect to the State of Karnataka",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Karnataka."
        },
        {
          article: "Article 371-J",
          title: "Special provisions with respect to the State of Kerala",
          content: "The President may, for the purposes of this Constitution, by order, make provision for the establishment of a Central University in the State of Kerala."
        },
        {
          article: "Article 372",
          title: "Continuance in force of existing laws and their adaptation",
          content: "Notwithstanding the repeal by this Constitution of the enactments specified in the Third Schedule, all laws in force immediately before the commencement of this Constitution in the territory of India shall continue in force until altered or repealed or amended by a competent Legislature or other competent authority."
        },
        {
          article: "Article 373",
          title: "Power of the President to make adaptation of laws",
          content: "For the purpose of bringing into force the provisions of this Constitution, the President may, by order, make such adaptations and modifications of any law made before the commencement of this Constitution as may be necessary or expedient, and may also make such provisions as may be necessary or expedient for bringing into force the provisions of this Constitution."
        },
        {
          article: "Article 374",
          title: "Power of the President to make orders as to transfer of certain pending proceedings",
          content: "The President may, by order, make such provision as may be necessary or expedient for the transfer of any pending proceedings in any court, tribunal or other authority in any territory which, before the commencement of this Constitution, was comprised within a Part A State or a Part B State to any court, tribunal or other authority in any other territory which, before such commencement, was comprised within a Part A State or a Part B State."
        },
        {
          article: "Article 375",
          title: "Courts, authorities and officers to continue to function subject to the provisions of the Constitution",
          content: "All courts, authorities and officers having jurisdiction in any territory which, before the commencement of this Constitution, was comprised within a Part A State or a Part B State shall, subject to the provisions of this Constitution, continue to exercise their respective jurisdictions, powers and authorities."
        },
        {
          article: "Article 376",
          title: "Provisions as to Judges of High Courts",
          content: "Notwithstanding anything in this Constitution, the Judges of the High Courts holding office immediately before the commencement of this Constitution shall, unless they have elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 377",
          title: "Provisions as to Comptroller and Auditor-General",
          content: "Notwithstanding anything in this Constitution, the Comptroller and Auditor-General of India holding office immediately before the commencement of this Constitution shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 378",
          title: "Provisions as to Public Service Commissions",
          content: "Notwithstanding anything in this Constitution, the Chairman and other Members of the Public Service Commission of a State holding office immediately before the commencement of this Constitution shall, unless they have elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 379",
          title: "Provisions as to Election Commission",
          content: "Notwithstanding anything in this Constitution, the Chief Election Commissioner and other Election Commissioners holding office immediately before the commencement of this Constitution shall, unless they have elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 380",
          title: "Provisions as to Finance Commission",
          content: "Notwithstanding anything in this Constitution, the Chairman and other Members of the Finance Commission holding office immediately before the commencement of this Constitution shall, unless they have elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 381",
          title: "Provisions as to Attorney-General",
          content: "Notwithstanding anything in this Constitution, the Attorney-General for India holding office immediately before the commencement of this Constitution shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 382",
          title: "Provisions as to Comptroller and Auditor-General",
          content: "Notwithstanding anything in this Constitution, the Comptroller and Auditor-General of India holding office immediately before the commencement of this Constitution shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 383",
          title: "Provisions as to Special Officer for Scheduled Castes, Scheduled Tribes and Anglo-Indians",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Scheduled Castes, Scheduled Tribes and Anglo-Indians appointed under article 336 shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 384",
          title: "Provisions as to Special Officer for Linguistic Minorities",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Linguistic Minorities appointed under article 350-B shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 385",
          title: "Provisions as to Special Officer for Backward Classes",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Backward Classes appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of his term of office."
        },
        {
          article: "Article 386",
          title: "Provisions as to Special Officer for Minorities",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Minorities appointed under article 350-A shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 387",
          title: "Provisions as to Special Officer for Women",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Women appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 388",
          title: "Provisions as to Special Officer for Children",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Children appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 389",
          title: "Provisions as to Special Officer for Persons with Disabilities",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Persons with Disabilities appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 390",
          title: "Provisions as to Special Officer for Senior Citizens",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Senior Citizens appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 391",
          title: "Provisions as to Special Officer for Persons belonging to Weaker Sections",
          content: "Notwithstanding anything in this Constitution, the Special Officer for Persons belonging to Weaker Sections appointed under article 340 shall, unless he has elected otherwise, continue to hold office until the expiration of their term of office."
        },
        {
          article: "Article 392",
          title: "Power of the President to remove difficulties",
          content: "The President may, for the purpose of removing any difficulties, make such provisions as may be necessary or expedient for the purpose of giving effect to the provisions of this Constitution."
        }
      ]
    },
    "Part XXII": {
      title: "Part XXII - Short Title, Commencement, Authoritative Text in Hindi and Repeals",
      articles: "Articles 393-395",
      description: "Short title of the Constitution, commencement of the Constitution, authoritative text in Hindi, and repeals.",
      articlesList: [
        {
          article: "Article 393",
          title: "Short title",
          content: "This Constitution may be called the Constitution of India."
        },
        {
          article: "Article 394",
          title: "Commencement",
          content: "This Constitution shall come into force on the 26th day of January, 1950."
        },
        {
          article: "Article 395",
          title: "Repeals",
          content: "The Indian Independence Act, 1947, the Government of India Act, 1935, and all other laws which were in force in the territory of India immediately before the commencement of this Constitution shall, to the extent of such inconsistency, stand repealed."
        }
      ]
    }
  };

  // Get the specific part content
  const currentPart = articlesContent[partNumber];
  
  if (!currentPart) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Part not found</h2>
        <p>The requested part "{partNumber}" is not available.</p>
        <button 
          onClick={handleViewParts}
          style={{ 
            background: "#007bff", 
            color: "#fff", 
            border: "none", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            cursor: "pointer", 
            fontSize: "14px",
            marginTop: "20px"
          }}
        >
          ← Back to Parts
        </button>
      </div>
    );
  }

  // Styles
  const styles = {
    container: {
      padding: isMobile ? "10px" : "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%"
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "30px",
      padding: isMobile ? "10px" : "20px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },
    title: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "700",
      color: "#2c3e50",
      margin: 0
    },
    backButton: {
      background: "#007bff",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      marginRight: "20px"
    },
    navigationButtons: {
      display: "flex",
      gap: "10px"
    },
    partInfo: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "30px",
      marginBottom: "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef"
    },
    articlesGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginBottom: "30px"
    },
    articleCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef",
      transition: "transform 0.2s ease"
    },
    articleHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      paddingBottom: "10px",
      borderBottom: "2px solid #e9ecef"
    },
    articleNumber: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#007bff",
      margin: 0
    },
    articleTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
      flex: 1,
      marginLeft: "15px"
    },
    articleContent: {
      fontSize: "15px",
      color: "#495057",
      lineHeight: "1.6",
      textAlign: "justify"
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        style={styles.backButton}
        onClick={onGoHome}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{currentPart.title}</h1>
        <div style={styles.navigationButtons}>
          <button 
            onClick={handleViewParts}
            style={{ 
              background: "#28a745", 
              color: "#fff", 
              border: "none", 
              padding: "8px 16px", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "14px",
              marginRight: "10px"
            }}
          >
            📚 View Parts
          </button>
          <button 
            onClick={handleViewConstitution}
            style={{ 
              background: "#007bff", 
              color: "#fff", 
              border: "none", 
              padding: "8px 16px", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "14px"
            }}
          >
            📜 View Constitution
          </button>
        </div>
      </div>

      {/* Part Information */}
      <div style={styles.partInfo}>
        <div style={{ fontSize: "18px", fontWeight: "600", color: "#2c3e50", marginBottom: "10px" }}>
          {currentPart.articles}
        </div>
        <div style={{ fontSize: "16px", color: "#495057", lineHeight: "1.6" }}>
          {currentPart.description}
        </div>
      </div>

      {/* Articles Section */}
      <div style={styles.articlesGrid}>
        {currentPart.articlesList.map((article, index) => (
          <div key={index} style={styles.articleCard}>
            <div style={styles.articleHeader}>
              <div style={styles.articleNumber}>{article.article}</div>
              <div style={styles.articleTitle}>{article.title}</div>
            </div>
            <div style={styles.articleContent}>{article.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
