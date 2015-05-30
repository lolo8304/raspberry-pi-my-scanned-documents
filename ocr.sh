#!/usr/bin/env bash
cd `dirname $0`
./ocr.rb scan*.pdf >> ocr.log 2>&1
