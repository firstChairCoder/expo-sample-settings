package expo.modules.settings

import android.content.Context
import android.content.SharedPreferences
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSettingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    //get SharedPreferences Editor instance and set value
    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme.value).commit()
      //bundleOf creates Bundle instances that allow eventually for real-time events subscription
      //from the JS side
      this@ExpoSettingsModule.sendEvent("onChangeTheme", bundleOf("theme" to theme.value))
    }

    //get value from sharedpreferences or return system if nnull
    Function("getTheme") {
      return@Function getPreferences().getString("theme", Theme.SYSTEM.value)
    }
  }

  private val context
    get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}

enum class Theme(val value: String): Enumerable {
  LIGHT("light")
  DARK("dark")
  SYSTEM("system")
}
