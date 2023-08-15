// External library dependencies.
import React from 'react';

// WordPress package dependencies.
const {
  addAction,
} = window?.wp?.hooks;

// Divi package dependencies.
const {
  RichTextContainer,
  TextContainer,
} = window?.divi?.fieldLibrary;
const {
  GroupContainer
} = window?.divi?.modal;
const {
  // Renderer - HTML
  ElementComponents,
  ModuleContainer,

  // Renderer - Styles
  ElementStyle,
  StyleContainer,

  // Renderer - Classnames
  elementClassnames,

  // Renderer - ScriptData
  useElementScriptData,

  // Settings - Content
  AdminLabelGroup,
  BackgroundGroup,
  FieldContainer,

  // Settings - Content
  AnimationGroup,
  BorderGroup,
  BoxShadowGroup,
  FiltersGroup,
  FontGroup,
  FontBodyGroup,
  SizingGroup,
  SpacingGroup,
  TransformGroup,

  // Settings - Advanced
  PositionSettingsGroup,
  ScrollSettingsGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
} = window?.divi?.module;
const {
  registerModule
} = window?.divi?.moduleLibrary;

// Module metadata that is used in both Frontend and Visual Builder.
import metadata from './module.json';

/**
 * React function component for rendering module style.
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag
}) => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Element: Module */}
    {elements.style({
      attrName: 'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility
        }
      }
    })}

    {/* Element: Title */}
    {elements.style({
      attrName: 'title',
    })}

    {/* Element: Content */}
    {elements.style({
      attrName: 'content',
    })}
  </StyleContainer>
);

/**
 * React function component for registering module script data.
 */
const ModuleScriptData = ({
  attrs,
  selector,
  id,
}) => {
  useElementScriptData({
    attrs: attrs?.module?.decoration,
    selector,
    id,
  });
  return null;
}

/**
 * Function for registering module classnames.
 */
const moduleClassnames = ({
  classnamesInstance,
  attrs,
}) => {
  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
    }),
  );
}

/**
 * Simple Quick Module.
 */
const simpleQuickModule = {
  // Metadata that is used on Visual Builder and Frontend
  metadata,

  // Layout renderer components.
  renderers: {
    // React Function Component for rendering module's output on layout area.
    edit: ({
      attrs,
      id,
      name,
      elements,
    }) => (
      <ModuleContainer
        attrs={attrs}
        elements={elements}
        id={id}
        moduleClassName="d5_tut_simple_quick_module"
        name={name}
        scriptDataComponent={ModuleScriptData}
        stylesComponent={ModuleStyles}
        classnamesFunction={moduleClassnames}
      >
        <ElementComponents
          attrs={attrs?.module?.decoration}
          id={id}
        />
        <div className="et_pb_module_inner">
          {elements.render({
            attrName: 'title',
          })}
          {elements.render({
            attrName: 'content',
          })}
        </div>
      </ModuleContainer>
    ),
  },

  // Settings component.
  settings: {
    // React function component that renders module settings' content panel.
    content: ({ defaultSettingsAttrs }) => (
      <React.Fragment>
        <GroupContainer
          id="mainContent"
          title="Text"
        >
          <FieldContainer
            attrName="title.innerContent"
            label="Title"
            description="Title"
          >
            <TextContainer />
          </FieldContainer>
          <FieldContainer
            attrName="content.innerContent"
            label="Content"
          >
            <RichTextContainer />
          </FieldContainer>
        </GroupContainer>
        <BackgroundGroup />
        <AdminLabelGroup
          defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
        />
      </React.Fragment>
    ),

    // React function component that renders module settings' design panel.
    design: () => (
      <React.Fragment>
        <FontGroup
          attrName="title.decoration.font"
          groupLabel="Title Font"
        />
        <FontBodyGroup
          attrName="content.decoration.bodyFont"
          groupLabel="Content Font"
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <FiltersGroup />
        <TransformGroup />
        <AnimationGroup />
      </React.Fragment>
    ),

    // React function component that renders module settings' advanced panel.
    advanced: () => (
      <React.Fragment>
        <VisibilitySettingsGroup />
        <TransitionGroup />
        <PositionSettingsGroup />
        <ScrollSettingsGroup />
      </React.Fragment>
    ),
  },

  // Attribute that is automatically added into the module when the module is inserted
  // into the layout so that the newly inserted module has some placeholder content
  placeholderContent: {
    module: {
      decoration: {
        background: {
          desktop: {
            value: {
              color: '#DFDFDF',
            }
          }
        },
      }
    },
    title: {
      innerContent: {
        desktop: {
          value: 'Module Title'
        }
      }
    },
    content: {
      innerContent: {
        desktop: {
          value: 'Module Content'
        }
      }
    }
  },
};

// Register module.
addAction('moduleLibrary.registerModuleLibraryStore.after', 'd5Tut.simpleQuickModule', () => {
  registerModule(simpleQuickModule.metadata, simpleQuickModule);
});