Del \\192.168.100.51\WebDeploy\KNTC_Public\KNTC_V2\KNTC_V2_Test\Client\static\js
Del \\192.168.100.51\WebDeploy\KNTC_Public\KNTC_V2\KNTC_V2_Test\Client\static\css
robocopy build \\192.168.100.51\WebDeploy\KNTC_Public\KNTC_V2\KNTC_V2_Test\Client /E /IS /XF *.cs *.mp4 /XD factory
