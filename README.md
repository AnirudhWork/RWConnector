# Richard Wright - Folder Structure

src
|-----> assets
| |----> fonts
| |----> images
| |----> icons
|
|----->utils #Contains all utility functions
|
|----->components #Contains all the components which are using throughout the application
|
|-----> config #All the configurations for app
|-----> navigators # All Navigation related files
| |------> NavigationContainer.js
| |------> AppStack.js
|
| ----->hooks #Contains all the custom hooks
|
|-----> network # All API Calls Related Files
|-----> screens # Contains all the screens
| |----> components #contains components used on the particular screen
| |----> models # all the model classes should be placed here
| |----> types # all the types for this component
| |----> constants # if any constants used for this particular component then should keep them
|
|----->store #Contains all the stores related files
|
|----->themes #Contains all the colors and typography

## Naming Conventions to be followed!

- Folder names must be always in small letters. (kebab-casing) Eg: text-field
- Component Name should be Pascal case. Eg: TextField.tsx
- Component style file name should be Camel case. Eg: textField-styles.ts(OPTIONAL - if we had too many styles then preferred)
- There should be a constant file in every component's folder, if you're using any constants and the name should be `constants.ts`
- NO DEFAULT EXPORTS, ONLY NAMED EXPORTS
- Every component should have an type / interface with name TComponentName / IComponentName. Eg: TTextField / ITextField if component  
  name is TextField(type is recommended)
  const TextField: React.FC<TTextField> = {props} => {}

- Use comments with every function & interface

- Git commit message format - <TicketNumber:Description> Eg: RW-101:test commit
