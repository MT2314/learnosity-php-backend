const layoutHtml = `
<div class="lrn-qe-edit-form">
    <span data-lrn-qe-label="stimulus"></span>
    <span data-lrn-qe-input="stimulus" class="lrn-qe-ckeditor-lg"></span>

    <span data-lrn-qe-label="options"></span>

    <div data-lrn-qe-toggle
         data-lrn-qe-section="options_with_accessibility_labels_toggle"
         data-lrn-qe-toggle-for-array="true"
         data-lrn-qe-toggle-selector=".aria-labels-container"
         data-lrn-qe-toggle-label="options.accessibility_labels.toggle"
         data-lrn-qe-toggle-default="false">
    </div>
    <div data-lrn-qe-loop="options[*]">
        <div class="lrn-qe-display-flex lrn-qe-flex-gap-sm lrn-qe-margin-bottom-xs">
            <span class="lrn-qe-flex-full" data-lrn-qe-input="options[*].label"></span>
        </div>
        <div class="aria-labels-container lrn-qe-padding-left-lg lrn-qe-form-el-removable lrn-qe-form-el-wrapper lrn-qe-margin-bottom-md">
            <div>
                <span data-lrn-qe-label="options[*].assistive_label.label" class="lrn-qe-margin-top-none lrn-qe-margin-bottom-xs"></span>
                <span data-lrn-qe-input="options[*].assistive_label.label" class="lrn-qe-margin-top-none"></span>
            </div>
            <div>
                <span data-lrn-qe-input="options[*].assistive_label.exposed_visible_label"
                      class="lrn-qe-inline-block lrn-qe-margin-top-none"></span>
                <span data-lrn-qe-label="options[*].assistive_label.exposed_visible_label"
                      class="lrn-qe-inline-block lrn-qe-margin-left-sm lrn-qe-margin-top-none"></span>
            </div>
        </div>
    </div>
    <span data-lrn-qe-section="options.button.add">
        <span data-lrn-qe-action-add="options"></span>
    </span>

    <!-- Validation -->
    <span data-lrn-qe-label="validation" data-lrn-qe-heading="4"
        data-lrn-qe-section="validation.heading"
        class="lrn-qe-h4 lrn-qe-section-header lrn-qe-text-bold lrn-qe-border-none"
    ></span>
    <div class="lrn-qe-tabs" data-lrn-qe-tabs data-lrn-qe-section="validation.content">
        <ul class="lrn-qe-tab-header">
            <li class="lrn-qe-tab-trigger" data-lrn-qe-tab-trigger>
                <span data-lrn-qe-label="validation.valid_response"></span>
            </li>
            <li data-lrn-qe-loop="validation.alt_responses[*]" class="lrn-qe-tab-trigger"
                data-lrn-qe-tab-trigger data-lrn-qe-section="validation.alt_responses">
                <span data-lrn-qe-label="validation.alt_responses[*]"></span>
            </li>
            <li>
                <span data-lrn-qe-action-add="validation.alt_responses" class="lrn-qe-tabs-add" data-lrn-qe-section="validation.alt_responses"></span>
            </li>
        </ul>

        <div class="lrn-qe-tab-item" data-lrn-qe-tab-item>
            <div class="lrn-qe-tab-sub-content">
                <span data-lrn-qe-input="validation.valid_response.score" class="lrn-qe-inline-block lrn-qe-text-left lrn-qe-form-control-xs lrn-qe-margin-left-sm"></span>
                <span data-lrn-qe-label="validation.valid_response.score" class="lrn-qe-inline-block lrn-qe-margin-left-sm"></span>
            </div>
            <span data-lrn-qe-input="validation.valid_response.value"></span>
        </div>

        <!-- Placeholder for alternate responses if the author uses them -->
        <div data-lrn-qe-loop="validation.alt_responses[*]" class="lrn-qe-tab-item"
             data-lrn-qe-tab-item data-lrn-qe-layout-listeners="add,remove"  data-lrn-qe-section="validation.alt_responses">
            <div class="lrn-qe-tab-sub-content">
                <span data-lrn-qe-action-remove="validation.alt_responses[*]" class="lrn-qe-tab-remove"></span>
                <span data-lrn-qe-input="validation.alt_responses[*].score" class="lrn-qe-inline-block lrn-qe-text-left lrn-qe-form-control-xs lrn-qe-margin-left-sm"></span>
                <span data-lrn-qe-label="validation.alt_responses[*].score" class="lrn-qe-inline-block lrn-qe-margin-left-sm"></span>
            </div>
            <span data-lrn-qe-input="validation.alt_responses[*].value"></span>
        </div>
    </div>

    <div class="lrn-qe-row-flex">
        <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
            <span data-lrn-qe-input="multiple_responses" class="lrn-qe-inline-block"></span>
            <span data-lrn-qe-label="multiple_responses" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
        </div>
        <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
            <span data-lrn-qe-input="shuffle_options" class="lrn-qe-inline-block"></span>
            <span data-lrn-qe-label="shuffle_options" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
        </div>
    </div>

    <!-- More options -->
    <h4 class="lrn-qe-heading" data-lrn-qe-adv-toggle>
        <button type="button" class="lrn-qe-form-label lrn-qe-margin-top-none lrn-qe-more-options" data-lrn-qe-section="more_options.heading">
            <span class="lrn-qe-i-arrow lrn-qe-inline-block" data-lrn-qe-section="more_options.toggle"></span>
            <span class="lrn-qe-inline-block lrn-qe-text-bold">
                <label class="lrn-qe-label lrn-qe-form-label-name" data-lrn-qe-i18n-label="heading.moreOptions" value="More options"></label>
            </span>
        </button>
    </h4>

    <div data-lrn-qe-adv-content data-lrn-qe-section="more_options.content">

        <!-- Scoring -->
        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header lrn-qe-border-none" data-lrn-qe-section="scoring.heading">
            <h5 class="lrn-qe-heading">
                <label class="lrn-qe-label lrn-qe-form-label-name lrn-qe-text-bold" data-lrn-qe-i18n-label="heading.scoring" value="Scoring"></label>
            </h5>
        </div>

        <div class="lrn-qe-row-flex" data-lrn-qe-section="validation.automarkable_fields">
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-input="validation.unscored" class="lrn-qe-inline-block"></span>
                <span data-lrn-qe-label="validation.unscored" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="validation.penalty"></span>
                <span data-lrn-qe-input="validation.penalty" class="lrn-qe-form-control-sm"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-input="instant_feedback" class="lrn-qe-inline-block"></span>
                <span data-lrn-qe-label="instant_feedback" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="feedback_attempts"></span>
                <span data-lrn-qe-input="feedback_attempts" class="lrn-qe-form-control-sm"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper data-lrn-qe-section="scoring.scoring_type">
                <span data-lrn-qe-label="validation.scoring_type"></span>
                <span data-lrn-qe-input="validation.scoring_type"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper data-lrn-qe-section="scoring.rounding">
                <span data-lrn-qe-label="validation.rounding"></span>
                <span data-lrn-qe-input="validation.rounding"></span>
            </div>
        </div>

        <div class="lrn-qe-row-flex">
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-input="validation.automarkable" class="lrn-qe-inline-block"></span>
                <span data-lrn-qe-label="validation.automarkable" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="validation.min_score_if_attempted"></span>
                <span data-lrn-qe-input="validation.min_score_if_attempted" class="lrn-qe-form-control-sm"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="validation.max_score"></span>
                <span data-lrn-qe-input="validation.max_score" class="lrn-qe-form-control-sm"></span>
            </div>
        </div>

        <!-- Layout -->
        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header" data-lrn-qe-section="layout.heading">
            <h5 class="lrn-qe-heading">
                <label class="lrn-qe-label lrn-qe-form-label-name lrn-qe-text-bold" data-lrn-qe-i18n-label="heading.layout" value="Layout and Selection"></label>
            </h5>
        </div>

        <div class="lrn-qe-row-flex" data-lrn-qe-section="layout.content">
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="ui_style.type"></span>
                <span data-lrn-qe-input="ui_style.type"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="ui_style.columns"></span>
                <span data-lrn-qe-input="ui_style.columns" class="lrn-qe-form-control-sm"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="ui_style.orientation"></span>
                <span data-lrn-qe-input="ui_style.orientation"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="ui_style.fontsize"></span>
                <span data-lrn-qe-input="ui_style.fontsize"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="min_selection"></span>
                <span data-lrn-qe-input="min_selection" class="lrn-qe-form-control-sm"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="max_selection"></span>
                <span data-lrn-qe-input="max_selection" class="lrn-qe-form-control-sm"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="ui_style.choice_label"></span>
                <span data-lrn-qe-input="ui_style.choice_label"></span>
                <span data-lrn-qe-label="ui_style.validation_stem_numeration"></span>
                <span data-lrn-qe-input="ui_style.validation_stem_numeration"></span>
            </div>
        </div>

        <!-- Extras -->
        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header" data-lrn-qe-section="details.heading">
            <h5 class="lrn-qe-heading">
                <label class="lrn-qe-label lrn-qe-form-label-name lrn-qe-text-bold" data-lrn-qe-i18n-label="heading.details" value="Extras"></label>
            </h5>
        </div>

        <div class="lrn-qe-row-flex" data-lrn-qe-section="details.content">
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="metadata.acknowledgements"></span>
                <span data-lrn-qe-input="metadata.acknowledgements"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="metadata.distractor_rationale"></span>
                <span data-lrn-qe-input="metadata.distractor_rationale"></span>
            </div>

            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="metadata.rubric_reference"></span>
                <span data-lrn-qe-input="metadata.rubric_reference"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="stimulus_review"></span>
                <span data-lrn-qe-input="stimulus_review"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="instructor_stimulus"></span>
                <span data-lrn-qe-input="instructor_stimulus"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="metadata.sample_answer"></span>
                <span data-lrn-qe-input="metadata.sample_answer"></span>
            </div>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper>
                <span data-lrn-qe-label="description"></span>
                <span data-lrn-qe-input="description"></span>
            </div>
        </div>

        <span data-lrn-qe-label="metadata.distractor_rationale_response_level" data-lrn-qe-section="metadata.heading"></span>
        <div data-lrn-qe-section="metadata.content">
            <div data-lrn-qe-loop="metadata.distractor_rationale_response_level[*]">
                <div data-lrn-qe-label="metadata.distractor_rationale_response_level[*]"></div>
                <div data-lrn-qe-input="metadata.distractor_rationale_response_level[*]"></div>
            </div>
            <span data-lrn-qe-action-add="metadata.distractor_rationale_response_level"></span>
        </div>

        <div class="lrn-qe-row-flex" data-lrn-qe-layout-wrapper>
            <div class="lrn-qe-col-xs-12 lrn-qe-col-sm-6" data-lrn-qe-layout-wrapper="is_math">
                <span data-lrn-qe-input="is_math" class="lrn-qe-inline-block"></span>
                <span data-lrn-qe-label="is_math" class="lrn-qe-inline-block lrn-qe-margin-left-xs"></span>
            </div>
        </div>
    </div>
</div>
              `;
