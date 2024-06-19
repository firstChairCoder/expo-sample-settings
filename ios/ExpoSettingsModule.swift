import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")
      
    //ref: https://docs.expo.dev/modules/module-api/#events
      Events("onChangeTheme")
      
    //set theme value
      Function("setTheme") { (theme: Theme) -> Void in
          UserDefaults.standard.set(theme.rawValue, forKey: "theme")
          //allows for quick sbscriptions to the change events on the JS side from the native side
          sendEvent("onChangeTheme", [
            "theme": theme.rawValue
          ])
      }

    //gets value from UserDefault string or fallback
    Function("getTheme") { () -> String in
        UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }
  }
    
    enum Theme: String, Enumerable {
        case light
        case dark
        case system
    }
}
