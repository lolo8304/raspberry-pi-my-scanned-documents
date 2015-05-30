#!/usr/bin/env bash
cd `dirname $0`

pidfile=`dirname $0`/ocr.pid
if [ -e $pidfile ]; then
  currentPID=$(<"$pidfile")
  if [ $currentPID ]; then
    currentProcess=`ps aux | awk '{print $2 }' | grep $currentPID`
    if [ $currentProcess ]; then
      echo "process is still running with pid $currentPID;"
      exit 1;
    fi
  fi
fi
echo $$ > ocr.pid
echo "" >> ocr.log
echo "" >> ocr.log
echo "`date` - running OCR detection and STORE to elasticsearch" >> ocr.log
./ocr.sh 
./store.sh
echo "`date`- DONE" >> ocr.log
rm $pidfile

