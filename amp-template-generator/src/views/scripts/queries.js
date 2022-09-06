const gql = require('graphql-request').gql;

const F_COMPONENT_CONTAINERS =
`fragment componentContainers on ComponentContainer {
  __typename
  id
  sections {
    id
    type
    components {
      componentName
      props
    }
  }
}`

const F_NESTED_CONTAINERS = 
`fragment nestedContainers on CourseStructureContainer {
  __typename
  id
  name
  type
  componentContainers {
    ...componentContainers
  }
}
${F_COMPONENT_CONTAINERS}`

const Q_COURSE =
gql`
query getCourse($id: ID!) {
  getCourse(id: $id) {
    __typename
    id
    name
    courseCode
    language
    children {
      ...nestedContainers
      children {
        ...nestedContainers
        children {
          ...nestedContainers
          children {
            ...nestedContainers
            children {
              ...nestedContainers
            }
          }
        }
      }
    }
  }
}
${F_NESTED_CONTAINERS}`

const Q_COURSE1 =
gql`
query GetCourse($id: ID!) {
    getCourse(id: $id) {
        id
        name
        grade
        subject
        courseCode
        description
        featuredImage {
            alt
            src
        }
        language
        credits
        createdAt
        updatedAt
    }
}`;

module.exports = {
    course: Q_COURSE,
    fragments: {
        nestedContainers: F_NESTED_CONTAINERS,
        componentContainers: F_COMPONENT_CONTAINERS,
    }
}