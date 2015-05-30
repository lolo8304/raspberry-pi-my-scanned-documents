#!/usr/bin/env bash
cd `dirname $0`
./store.rb scan*.pdf >> ocr.log 2>&1
