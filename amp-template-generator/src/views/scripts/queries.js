const F_COURSE = `
fragment Course on Course {
    uuid
    uuidClean
    type
    courseName
    courseCode
    units {
        ...Unit
    }
}`;

const F_UNIT = `
fragment Unit on Unit {
    uuid
    uuidClean
    type
    title
    lessons {
        ...Lesson
    }
}`;

const F_LESSON = `
fragment Lesson on Lesson {
    uuid
    uuidClean
    type
    title
    lessonPaths {
        courseUUID
        courseName
        courseCode
        unitNumber
        lessonNumber
    }
    learningGoals
    successCriteria
    sections {
      ...Section
    }
}`;

const F_SECTION = `
fragment Section on Section {
    uuid
    uuidClean
    type
    sectionType 
    topics {
        ...Topic
    }
}`;

const F_TOPIC = `
fragment Topic on Topic {
    uuid
    uuidClean
    type
    heading {
        processed
    }
    components {
        ...Accordion
        ...Audio
        ...BrightcoveVideo
        ...Callout
        ...Carousel
        ...FormattedText
        ...Iframe
        ...Image
        ...QuestionAndAnswer
        ...QuoteBox
        ...Table
        ...Tabs
        ...YoutubeVideo
        ...Quiz
    }
}`;

const F_BRIGHTCOVE_VIDEO = `
fragment BrightcoveVideo on BrightcoveVideo {
    uuid
    uuidClean
    type
    brightcoveDataPlayer
    brightcoveDataVideoId
}`;

const F_IMAGE = `
fragment Image on Image {
    uuid
    uuidClean
    type
    width
    height
    url
    altText
    caption
    imageStyles {
        name
        width
        height
        url
    }
}`;

const F_FORMATTED_TEXT = `
fragment FormattedText on FormattedText {
    uuid
    uuidClean
    type
    heading {
        processed
    }
    body
}`;

const F_IFRAME = `
fragment Iframe on Iframe {
    uuid
    uuidClean
    type
    width
    height
    url
    title
}`;

const F_CALLOUT = `
fragment Callout on Callout {
    uuid
    uuidClean
    type
    calloutType
    body
    heading {
        processed
    }
}`;

const F_ACCORDION = `
fragment Accordion on Accordion {
    uuid
    uuidClean
    type
    heading {
        processed
    }
    introduction
    accordionPanes {
        uuid
        uuidClean
        type
        heading {
            processed
        }
        body
    }
}`;

const F_CAROUSEL = `
fragment Carousel on Carousel {
    uuid
    uuidClean
    type
    slides {
        ...Image
        ...FormattedText
    }
}`;

const F_QUESTION_AND_ANSWER = `
fragment QuestionAndAnswer on QuestionAndAnswer {
    uuid
    uuidClean
    type
    answerType
    question
    allowStudentResponse
    answer
}`;

const F_QUOTEBOX = `
fragment QuoteBox on QuoteBox {
    uuid
    uuidClean
    type
    body
    citation
    url
}`;

const F_AUDIO = `
fragment Audio on Audio {
    uuid
    uuidClean
    type
    introduction
    transcript
    url
}`;

const F_YOUTUBE_VIDEO = `
fragment YoutubeVideo on YoutubeVideo {
    uuid
    uuidClean
    type
    videoUrl
    thumbnailUrl
    thumbnailWidth
    thumbnailHeight
}`;

const F_TABLE = `
fragment Table on Table {
    uuid
    uuidClean
    type
    caption
    headers
    freezeLeft
    rows {
        columns {
            type
            field
        }
    }
}`;

const F_TABS = `
fragment Tabs on Tabs {
    uuid
    uuidClean
    type
    tabs {
        ... on Tab {
            uuid
            uuidClean
            type
            tabLabel 
            components {
                ...BrightcoveVideo
                ...FormattedText
                ...Image
                ...YoutubeVideo
            }
        }
    }
}`;

const F_QUIZ = `
fragment Quiz on Quiz {
    uuid
    uuidClean
    type
    heading {
        processed
    }
    introduction
    questions {
        ...TrueFalseQuestion
        ...MultipleChoiceQuestion
    }
}`;

const F_TRUE_FALSE_QUESTION = `
fragment TrueFalseQuestion on TrueFalseQuestion {
    uuid
    uuidClean
    type
    question {
        ...Image
        ...FormattedText
    }
    answer
    feedbackCorrect
    feedbackIncorrect
}`;

const F_MULTIPLE_CHOICE_QUESTION = `
fragment MultipleChoiceQuestion on MultipleChoiceQuestion {
    uuid
    uuidClean
    type
    question {
        ...Image
        ...FormattedText
    }
    answers {
        ... on MultipleChoiceAnswer {
            uuid
            uuidClean
            type
            answerCopy
            correctAnswer
            feedback
        }
    }
}`;

const Q_LESSON = `
query($uuid:String!) {
    getLesson(uuid: $uuid) {
        ...Lesson
    }
}

${F_LESSON}
${F_SECTION}
${F_TOPIC}
${F_ACCORDION}
${F_AUDIO}
${F_BRIGHTCOVE_VIDEO}
${F_CALLOUT}
${F_CAROUSEL}
${F_FORMATTED_TEXT}
${F_IFRAME}
${F_IMAGE}
${F_QUESTION_AND_ANSWER}
${F_QUOTEBOX}
${F_TABLE}
${F_TABS}
${F_YOUTUBE_VIDEO}
${F_QUIZ}
${F_MULTIPLE_CHOICE_QUESTION}
${F_TRUE_FALSE_QUESTION}
`;

const Q_COURSE = `
query($uuid:String!) {
    getCourse(uuid: $uuid) {
        ...Course
    }
}

${F_COURSE}
${F_UNIT}
${F_LESSON}
${F_SECTION}
${F_TOPIC}
${F_ACCORDION}
${F_AUDIO}
${F_BRIGHTCOVE_VIDEO}
${F_CALLOUT}
${F_CAROUSEL}
${F_FORMATTED_TEXT}
${F_IFRAME}
${F_IMAGE}
${F_QUESTION_AND_ANSWER}
${F_QUOTEBOX}
${F_TABLE}
${F_TABS}
${F_YOUTUBE_VIDEO}
${F_QUIZ}
${F_MULTIPLE_CHOICE_QUESTION}
${F_TRUE_FALSE_QUESTION}
`;

module.exports = {
    lesson: Q_LESSON,
    course: Q_COURSE,
    fragments: {
        lesson: F_LESSON,
        section: F_SECTION,
        topic: F_TOPIC,

        accordion: F_ACCORDION,
        audio: F_AUDIO,
        brightcoveVideo: F_BRIGHTCOVE_VIDEO,
        callout: F_CALLOUT,
        carousel: F_CAROUSEL,
        formattedText: F_FORMATTED_TEXT,
        iframe: F_IFRAME,
        image: F_IMAGE,
        questionAndAnswer: F_QUESTION_AND_ANSWER,
        quotebox: F_QUOTEBOX,
        table: F_TABLE,
        tabs: F_TABS,
        youtubeVideo: F_YOUTUBE_VIDEO,
        quiz: F_QUIZ,
        trueFalseQuestion: F_TRUE_FALSE_QUESTION,
        multipleChoiceQuestion: F_MULTIPLE_CHOICE_QUESTION
    }
};