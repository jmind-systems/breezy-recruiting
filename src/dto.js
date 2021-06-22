const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
}

class candidate {
    constructor(name) {
        this.name = name
        this.origin = 'sourced'
        this.education = []
        this.work_history = []
        this.social_profiles = {}
    }

    add_education(ed) {
        this.education.push(ed)
    }

    add_work(work) {
        this.work_history.push(work)
    }
}

class education {
    constructor(school_name, degree_name, field_of_study, start_year, end_year) {
        this.school_name = school_name
        this.degree_name = degree_name
        this.field_of_study = field_of_study
        if (start_year) {
            this.start_year = start_year
        }
        if (end_year) {
            this.end_year = end_year
        }
    }
}

class work {
    constructor(company_name, title, summary, start_date, end_date) {
        this.company_name = company_name
        this.title = title
        this.summary = summary
        if (start_date) {
            let [month, year] = start_date.split(' ')
            month = months[month]
            year = parseInt(year, 10)
            this.start_month = month
            this.start_year = year
        }
        if (end_date) {
            if (end_date == "Present") {
                end_date = new Date()
                this.end_month = end_date.getMonth()
                this.end_year = end_date.getFullYear()
            } else {
                let [month, year] = end_date.split(' ')
                month = months[month]
                year = parseInt(year, 10)
                this.end_month = month
                this.end_year = year
            }
        }
    }
}

export { candidate, education, work }