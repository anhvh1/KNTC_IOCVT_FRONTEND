const theme = {};
theme.palette = {
  primary: [
    "#4482FF", // 0: Default
    "#3A78F5", // 1: Darken 4%
    "#3775F2", // 2: Darken 5%
    "rgba(68, 130, 255, 0.2)", // 3: Fade 20%
    "#4C8AFF", // 4: Lighten 3%
    "rgba(68, 130, 255, 0.75)", // 5: Fade 75%
    "#6AA8FF", // 6: Lighten 15%
    "#63A1FF", // 7: Lighten 12%
    "#3F7DFA", // 8: Darken 2%
    "#3369e7", // 9: Algolia color
    "#5896FF", // 10: Lighten 8%
    "#2b69e6", // 11:
    "#236cfe", // 12: darken 10%
    "#4d88ff", // 13: Lighten 5%
    "#2878D7", // 14: Main color
    "#5392df", // 15: Submain color
    "#fafafa", // 16: table color
    "#fff", // 17: white
    "#000", // 18: black
    "#FF6F00", //19 : orange button
    "#F2F6FC", //20 : background layout
    "#DADCE0", //21 : hover sidebar
    "rgba(250, 198, 47, 1)", //22 background button secondary
    "rgba(210, 165, 35, 1)", //23 hover btn secondary
    "rgba(99, 198, 179, 1)", //24 background button import
    "rgba(80, 180, 160, 1)", //25 background button import hover
    "rgba(23, 132, 236, 1)", //26 background send list
    "rgba(15, 105, 210, 1)", //27 background send list hover
    "rgba(45, 166, 69, 1)", //28 background button add
    "rgba(30, 130, 55, 1)", //29 hover background button add
    "rgba(99, 198, 179, 1)", //30 hover background button add
    "rgba(79, 158, 143, 1)", //31 hover background button add
    "rgba(222, 240, 255, 1)", //32 hover background button add
    "rgb(93, 164, 255,1)", //33 hover background button add
  ],
  secondary: [
    "#2d3446", // 0: DarkBlue
    "#f1f3f6", // 1: LightBluish
    "#333333", // 2: LightBlue ###in header
    "#E4E6E9", // 3: LightBluish Darken 5%
    "#364d79", // 4:
    "#202739", // 5: DarkBlue Darken 5%
    "#f5f6f8", // 6: LighterBluish
    "#e9ebf1", // 7: DarkBluish
    "#F6F8FB", // 8: LighterBluish Lighten 2%
    "#E9EBEE", // 9: LighterBluish Darken 3%
    "#D3E3FD", // 10: Sidebar submenu select
    "#D01E1E", // 11: Red
    "#F2F6FC", // 12: Background table
    "#F2F6FC", // 13: Hover Table
  ],
  color: [
    "#FEAC01", // 0: Orange
    "#42299a", // 1: Purple
    "#F75D81", // 2: Pink
    "#7ED321", // 3: LimeGreen
    "#39435f", // 4: BlueShade
    "#FFCA28", // 5: Yellow
    "#F2BD1B", // 6: Yellow Darken 5%
    "#3b5998", // 7: Facebook
    "#344e86", // 8: Facebook Darken 5%
    "#dd4b39", // 9: Google Plus
    "#d73925", // 10: Google Plus Darken 5%
    "#e14615", // 11: Auth0
    "#ca3f13", // 12: Auth0
    "#e0364c", // 13: themeColor--AlizarinCrimson
    "#D01E1E", // 14: Red
    "#fff", // 15: white
  ],
  warning: [
    "#ffbf00", // 0: Warning
  ],
  success: [
    "#00b16a", // 0: Success
  ],
  error: [
    "#f64744", // 0: Error
    "#EC3D3A", // 1: Darken 4%
    "#FF5B58", // 2: Lighten 8%
  ],
  grayscale: [
    "#bababa", // 0: GreyShade
    "#c1c1c1", // 1: GreyDark
    "#D8D8D8", // 2: Grey
    "#f1f1f1", // 3: GreyAlt
    "#F3F3F3", // 4: GreyLight
    "#fafafa", // 5: DarkWhite
    "#F9F9F9", // 6: DarkerWhite
    "#fcfcfc", // 7: #fff Darken 1%
    "#eeeeee", // 8:
    "#fbfbfb", // 9:
    "#f5f5f5", // 10:
    "#f7f8f9", // 11: today-highlight-bg
  ],
  text: [
    "#323332", // 0: Heading
    "#595959", // 1: HeadingLight
    "#979797", // 2: Text
    "#333333", // 3: TextDark ###intable
    "#6a6c6a", // 4: Heading Lighten 22%
    "#D01E1E", // 5: Red
    "#000", // 6: black
    "#fff", // 7: white
  ],
  border: [
    "#d9d9d9", // 0: Border
    "#d8d8d8", // 1: BorderDark
    "#ebebeb", // 2: BorderLight
    "#d3d3d3", // 3:
    "rgba(228, 228, 228, 0.65)", // 4:
  ],

  calendar: [
    "#905", // 0:
    "#690", // 1:
    "#a67f59", // 2:
    "#07a", // 3:
    "#dd4a68", // 4:
    "#e90", // 5:
  ],

  hover: [
    "#94CEF7", //hover sidebar
  ],

  // fontSize : [
  //   '17px', // 0:
  //   '', // 1:
  //   '#a67f59', // 2:
  //   '#07a', // 3:
  //   '#dd4a68', // 4:
  //   '#e90', // 5:
  // ]
};

theme.fonts = {
  primary: "Roboto, sans-serif",
  pre: "Consolas, Liberation Mono, Menlo, Courier, monospace",
};

export default theme;
