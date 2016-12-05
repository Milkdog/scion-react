using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;
using CodePush.ReactNative;

namespace scion
{
    class MainPage : ReactPage
    {
        private CodePushReactPackage codePushReactPackage;

        public override string MainComponentName
        {
            get
            {
                return "scion";
            }
        }

#if BUNDLE
        public override string JavaScriptBundleFile
        {
            get
            {
                //return "ms-appx:///ReactAssets/index.windows.bundle";
                codePushReactPackage = new CodePushReactPackage("izsJRiv_NDAWG-ut7LHICgT3lCjWVJ3gLPobG", this);
                return codePushReactPackage.GetJavaScriptBundleFile();
            }
        }
#endif

        public override List<IReactPackage> Packages
        {
            get
            {
                return new List<IReactPackage>
                {
                    new MainReactPackage(),
                    codePushReactPackage
                };
            }
        }

        public override bool UseDeveloperSupport
        {
            get
            {
#if !BUNDLE || DEBUG
                return true;
#else
                return false;
#endif
            }
        }
    }

}
