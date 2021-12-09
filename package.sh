PACKAGE="app.zip"

[ -f $PACKAGE ] && rm $PACKAGE
cd app; zip -r ../$PACKAGE *;cd ..