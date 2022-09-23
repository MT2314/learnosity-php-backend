function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('COMPONENT', 'component');
define('TOPIC', 'topic');
define('SECTION', 'section');
define('LESSON', 'lesson');
define('UNIT', 'unit');
define('COURSE', 'course');

// exports is set inside the define() method, so you do not need to set module.exports