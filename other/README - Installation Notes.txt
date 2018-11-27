Android





1) Install React Native Navigation v2
https://wix.github.io/react-native-navigation/v2/#/docs/Installing

---> fix: https://github.com/wix/react-native-navigation/issues/3419#issue-334820245
---> more on this fix (copied from the thread)

The problem was solved by the below change. It seems a lower version of support library causes this issue (See https://stackoverflow.com/questions/49112190/error-program-type-already-present-android-support-design-widget-coordinatorl ).

--- /home/hiroshi/temp/build.gradle     2018-06-22 18:57:43.984886562 +0900
+++ ./node_modules/react-native-navigation/lib/android/app/build.gradle  2018-06-22 18:23:17.236358407 +0900
@@ -66,9 +66,9 @@
 
 dependencies {
     implementation fileTree(include: ['*.jar'], dir: 'libs')
-    implementation 'com.android.support:design:26.1.0'
-    implementation 'com.android.support:appcompat-v7:26.1.0'
-    implementation 'com.android.support:support-v4:26.1.0'
+    implementation "com.android.support:design:${rootProject.ext.supportLibVersion}"
+    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
+    implementation "com.android.support:support-v4:${rootProject.ext.supportLibVersion}"
     implementation 'com.aurelhubert:ahbottomnavigation:2.1.0'
     implementation 'com.github.clans:fab:1.6.4'
 
@@ -81,4 +81,4 @@
     testImplementation 'org.assertj:assertj-core:3.8.0'
     testImplementation 'com.squareup.assertj:assertj-android:1.1.1'
     testImplementation 'org.mockito:mockito-core:2.13.0'
-}
\ No newline at end of





2) Add the icon 
https://medium.com/@scottianstewart/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c
---> setting up round icon: https://www.techomoro.com/how-to-add-app-icon-to-react-native-android-app/
* current icon is friendly borrowed from
https://www.clipartmax.com/middle/m2i8G6K9A0N4Z5K9_mobile-app-development-perth-mobile-app-vector-png/ 





3) Rename the app in 
android/app/src/main/res/values/strings.xml





4) Install react-native-vector-icons
https://github.com/oblador/react-native-vector-icons#android
---> follow manual installation steps:
https://github.com/oblador/react-native-vector-icons#option-manually-1





5) Install Victory Formidable
https://github.com/FormidableLabs/victory-native 





6) Install SVG
https://github.com/react-native-community/react-native-svg#manual





7) Install moment
http://momentjs.com/docs/
