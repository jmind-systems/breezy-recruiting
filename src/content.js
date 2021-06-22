import { candidate, education, work } from './dto'

var xpath = {
    fullname: '//*[contains(@class,"pv-top-card")]/div[2]/div[2]/div/div[1]/h1',
    summary: '//*[contains(@class,"pv-top-card")]/div[2]/div[2]/div/div[2]',
    location: '//*[contains(@class,"pv-top-card")]/div[2]/div[2]/div/div[contains(@class,"pb2")]/span[1]',
    image: '//*[contains(@class,"pv-top-card__image")]/img',
    about: '//*[contains(@class,"pv-about-section")]/div',
    linkedin: '//section[contains(@class,"pv-contact-info__contact-type")]/div[contains(@class,"pv-contact-info__ci-container")]/a',
    phone: '//div/section[3]/ul/li/span[1]',
    email: '//div/section[4]/div/a',
    website: '//div/section[2]/ul/li/div/a',
    birthday: '//div/section[5]/div/span',
    experience: '//section[contains(@class,"experience-section")]/ul/li',
    education: '//section[contains(@class,"education-section")]/ul/li',
    skills: '//section[contains(@class,"pv-skill-categories-section")]//ol/li',

    certifications: '//section[contains(@class,"pv-profile-section--certifications-section")]//ul/li',
    school_name: '//div[contains(@class,"pv-entity__degree-info")]/h3[contains(@class,"pv-entity__school-name")]',
    degree_name: '//div[contains(@class,"pv-entity__degree-info")]/p[contains(@class,"pv-entity__degree-name")]/span[2]',
    field_of_study: '//div[contains(@class,"pv-entity__degree-info")]/p[contains(@class,"pv-entity__fos")]/span[2]',
    start_year: '//p[contains(@class,"pv-entity__dates")]/span[2]/time[1]',
    end_year: '//p[contains(@class,"pv-entity__dates")]/span[2]/time[2]',

    position: '//div[contains(@class,"pv-entity__summary-info")]/h3',
    company_name: '//div[contains(@class,"pv-entity__summary-info")]/p[2]',
    work_period: '//div[contains(@class,"pv-entity__summary-info")]//h4[contains(@class,"pv-entity__date-range")]/span[2]',
    summary: '//div[contains(@class,"pv-entity__extra-details")]/div',

    company_name_multiple_positions: '//div[contains(@class,"pv-entity__company-summary-info")]/h3/span[2]',
    positions_same_company: '//ul[contains(@class,"pv-entity__position-group")]/li',
    position_same_company: '//h3/span[2]',
    work_period_same_company: '//h4[contains(@class,"pv-entity__date-range")]/span[2]',
    summary_same_company: '//div[contains(@class,"pv-entity__extra-details")]/div',
}

const get_by_xpath = (path, node = document) => document.evaluate(path, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
const get_by_xpath_iter = (path, node = document) => document.evaluate(path, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
const get_by_xpath_list = (path, node = document) => {
    let nodes = document.evaluate(path, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    let node_copies = []
    for (let i = 0; i < nodes.snapshotLength; i++) {
        let node_copy = nodes.snapshotItem(i).cloneNode(true)
        node_copies.push(node_copy)
    }
    return node_copies
}

const parse_linkedin = () => {
    let fullname = get_by_xpath(xpath.fullname)
    let location = get_by_xpath(xpath.location)
    let image = get_by_xpath(xpath.image)
    let summary = get_by_xpath(xpath.summary)
    let about = get_by_xpath(xpath.about)
    let linkedin = get_by_xpath(xpath.linkedin)
    let phone = get_by_xpath(xpath.phone)
    let email = get_by_xpath(xpath.email)
    let website = get_by_xpath(xpath.website)
    let birthday = get_by_xpath(xpath.birthday)
    let experienceList = get_by_xpath_list(xpath.experience)
    let educationList = get_by_xpath_list(xpath.education)
    let skillsList = get_by_xpath_list(xpath.skills)
    let certificationsList = get_by_xpath_list(xpath.certifications)

    // console.log("fullname: ",fullname)
    // console.log("location: ",location)
    // console.log("image: ",image)
    // console.log("summary: ",summary)
    // console.log("about: ",about)
    // console.log("linkedin: ",linkedin)
    // console.log("phone: ",phone)
    // console.log("email: ",email)
    // console.log("website: ",website)
    // console.log("birthday: ",birthday)
    // console.log("experience: ",experienceList)
    // console.log("education: ",educationList)
    // console.log("skills: ",skillsList)
    // console.log("certifications: ",certificationsList)

    fullname = fullname ? fullname.textContent.trim() : ""
    let result = new candidate(fullname)

    if (location) {
        result.address = location.textContent.trim()
    }

    if (summary) {
        result.summary = summary.textContent.trim()
    }

    if (linkedin) {
        result.social_profiles.linkedin = linkedin.href
    }

    if (experienceList) {
        experienceList.forEach(exp => {
            let positions = get_by_xpath_list(xpath.positions_same_company, exp)
            if (positions.length !== 0) {
                let company_name = get_by_xpath(xpath.company_name_multiple_positions, exp)
                company_name = company_name ? company_name.textContent.trim() : ''
                positions.forEach((pos) => {
                    let position = get_by_xpath(xpath.position_same_company, pos)
                    let work_period = get_by_xpath(xpath.work_period_same_company, pos)
                    let summary = get_by_xpath(xpath.summary_same_company, pos)

                    position = position ? position.textContent.trim() : ''
                    work_period = work_period ? work_period.textContent.trim() : null
                    summary = summary ? summary.textContent.trim() : ''
                    let [start_date, end_date] = work_period ? work_period.split(' – ') : [null, null]
                    console.log(company_name)
                    console.log(work_period)
                    console.log(end_date)

                    result.add_work(new work(company_name, position, summary, start_date, end_date))
                })
            } else {
                let company_name = get_by_xpath(xpath.company_name, exp)
                let position = get_by_xpath(xpath.position, exp)
                let work_period = get_by_xpath(xpath.work_period, exp)
                let summary = get_by_xpath(xpath.summary, exp)

                company_name = company_name ? company_name.textContent.trim() : ''
                position = position ? position.textContent.trim() : ''
                work_period = work_period ? work_period.textContent.trim() : null
                summary = summary ? summary.textContent.trim() : ''
                let [start_date, end_date] = work_period ? work_period.split(' – ') : [null, null]
                console.log(company_name)
                console.log(work_period)
                console.log(end_date)

                result.add_work(new work(company_name, position, summary, start_date, end_date))
            }
        });
    }

    if (educationList) {
        educationList.forEach(ed => {
            let school_name = get_by_xpath(xpath.school_name, ed)
            let degree_name = get_by_xpath(xpath.degree_name, ed)
            let field_of_study = get_by_xpath(xpath.field_of_study, ed)
            let start_year = get_by_xpath(xpath.start_year, ed)
            let end_year = get_by_xpath(xpath.end_year, ed)

            school_name = school_name ? school_name.textContent.trim() : ''
            degree_name = degree_name ? degree_name.textContent.trim() : ''
            field_of_study = field_of_study ? field_of_study.textContent.trim() : ''
            start_year = start_year ? parseInt(start_year.textContent.trim(), 10) : null
            end_year = end_year ? parseInt(end_year.textContent.trim(), 10) : null

            result.add_education(new education(school_name, degree_name, field_of_study, start_year, end_year))
        });

    }

    return result;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log(sender, req)

    switch (req.message) {
        case "PARSE_HTML":
            console.log(window.location.href)

            switch (window.location.hostname) {
                case "www.linkedin.com":
                    let result = parse_linkedin()
                    console.log(result);
                    sendResponse(result);
                    break;
                default:
                    sendResponse("not linkedin");
            }
            break;
        default:
            console.log("unknown command: ", req.message)
    }
});
