# KYKMenu
In this project, an application has been made that shows students what is available for breakfast, lunch and dinner in KYK dormitories. There are user login page, registration page, meal selection screen, profile editing screen, and screens where meals are displayed and meals are listed.

# Technologies
## Mobile Development
- React Native: Mobile application development
- Expo: Framework that makes React Native applications easy
- React Navigation: In-app page transitions

## Backend and Database
- Firebase: Authentication and database management
- Firestore: Cloud-based NoSQL database

## Figma
Figma was used to design the pages and position the buttons and inputs within the page.

# Libraries
- ## Navigation:

@react-navigation/native,

@react-navigation/stack

- ## Firebase ve Firestore:

firebase,

@react-native-firebase/app,

@react-native-firebase/auth,

@firebase/firestore

- ## Storage and Permanence:

@react-native-async-storage/async-storage

- ## Date and Time Pickers:

@react-native-community/datetimepicker,

@react-native-modal-datetime-picker

- ## React Native Core Libraries:

react,

react-native

- ## Safe Area Management:

react-native-safe-area-context

- ## Other Used Libraries:

react-native-actionsheet-picker



# Usage
- ## Install Dependencies

Run the following command to install the required dependencies:

"npm install"

- ## Update Firebase Configuration

Make sure to add your own Firebase project configuration in the firebaseConfig.js file.

- ## Run the Application

### For Android and iOS devices/simulators, you can use the following commands:

If you are using Expo:

"npx expo start"

To run on Android device or emulator:

"npx react-native run-android"

To run on an iOS device or simulator (Mac required):

"npx react-native run-ios"

- ## Login and Registration Procedures

Use the Sign Up page to create a new account.

If you are an existing user, you can log in from the Login screen.

- ## Using the Home Screen

To view the menus, go to the KYK Menu page.

You can view breakfast, lunch and dinner menus.

You can update your user information from the profile page.
