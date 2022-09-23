const gql = require("graphql-request").gql;

const F_COMPONENT_CONTAINERS = `fragment componentContainers on ComponentContainer {
  __typename
  id
  sections {
    __typename
    id
    type
    components {
      __typename
      componentName
      props
    }
  }
}`;

const F_NESTED_CONTAINERS = `fragment nestedContainers on CourseStructureContainer {
  __typename
  id
  name
  type
  componentContainers {
    ...componentContainers
  }
}
${F_COMPONENT_CONTAINERS}`;

const Q_COURSE = gql`
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
  ${F_NESTED_CONTAINERS}
`;

const Q_COURSE1 = gql`
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
  }
`;

const Q_GETLESSONS = gql`
  query GetLessons($id: ID!) {
    getLessons(id: $id) {
      __typename
      id
      type
      name
      description
      indexInParent
      componentContainer {
        __typename
        id
        lastUpdateID
        title
        sections {
          __typename
          id
          type
          locked
          components {
            id
            componentName
            props
            locked
          }
        }
        parentCourseID
        createdAt
        updatedAt
      }
      path {
        id
        type
        name
        indexInParent
      }
      index
    }
  }
`;

module.exports = {
  course: Q_COURSE,
  fragments: {
    nestedContainers: F_NESTED_CONTAINERS,
    componentContainers: F_COMPONENT_CONTAINERS,
  },
  getLessons: Q_GETLESSONS,
};
