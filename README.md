raspberry pi - my scanned documents
===================================

"raspberry pi - my scanned documents" is simple and compact way to allow everyone have fully-searchable access their scanned documents (as PDF) via a simple google-alike-search webfrontend (based on Calaca https://github.com/romansanchez/Calaca)

- split PDF into TIF use GPL Ghostscript
- run OCR (Optimal character recognition) using best open source tesseract (https://code.google.com/p/tesseract-ocr/)
- add text and index into local elasticsearch instance to allow full-text search
- simple webfrontend (Calaca https://github.com/romansanchez/Calaca) to search
- simple ocr and index scripts to automate using CRON
- use standard /etc/init.d scripts to enable automatic startup


preconditions to install
=====================================
the following software components needs to be installed (as described below in details step by step) on your raspberry pi
please check if some of these components are already installed

- ruby (via apt-get)
- tesseract-ocr (via apt-get)
- elasticsearch (via DEB package from homepage)


download
=====================================
download our git repo at https://github.com/lolo8304/raspberry-pi-my-scanned-documents.git using zip download or your git-client-software

recommandation after download

- I have installed the files NOT on my raspberry pi (except tesseract, elasticsearch, ruby) due to the fact that I had issues with fast / many writes to the same directory / files. The sd-card controller made my SD-CARD crash and I had to wipe and install it several times
- I have mounted via nfs a network storage directory that is very close to my raspi to reduce latency accessing the disk

here you see the example with IP: 192.168.0.10 point to NAS directory /volume1/scan and mount it to /opt/scan
There are many ways of mounting network drives (e.g. NFS or SAMBA). Due to the fact that raspi and my NAS are linux based and the NAS supports NFS access I used NFS for speed reasons

if you have a SYNOLOGY NAS get some help via http://raspberrypi.stackexchange.com/questions/22300/mount-nfs-folder-share-on-rpi-from-a-synology-nas
```bash
sudo mount 192.168.0.10:/volume1/scan /opt/scan/ -o nolock
```

for a permanent mount point add it to your /etc/fstab
use vi to edit as root

sudo vi /etc/fstab
```bash
192.168.0.10:/volume1/scan   /opt/scan       nfs     rw,defaults,nolock         0       0
```

restart mount points using
```bash
mount -a
```

install ruby
=====================================

upgrade first your raspi and then install ruby

```bash
sudo apt-get update
sudo apt-get install ruby

```


install tesseract
=====================================
tesseract is the best open source OCR detection for linux but published for many architectures (win, mac, linux, raspberry pi, ...)
install via apk-get from you raspberry pi

you can install tesseract to detect many languages (unfortunately not automatically :-()
check other languages: see list for concrete suffix via apt-cache
and check "reveresed depends"
```bash
apt-cache showpkg tesseract-ocr 
```

for standard english dictionary and 2nd line for example 'german' (deu). There is another german "Fraktur (old German writing)" if you intend to scan old german books.
```bash
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-deu
```


install elasticsearch on raspberry pi
=====================================

use the newest version of elasticsearch visiting download page
https://www.elastic.co/downloads/elasticsearch
and check for DEB release

in this example we are using 1.5.2
```bash
sudo wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.5.2.deb
sudo dpkg -i elasticsearch-1.5.2.deb
sudo update-rc.d elasticsearch defaults 95 10
```

```bash
sudo vi /etc/elasticsearch/elasticsearch.yml a
```
and update keys based on templates: see 
	/conf/elasticsearch.template.yml and example
	/conf/elasticsearch.yml
and adapt the following keys

```bash
path.data: /your/directory/elasticsearch/data
path.work: /your/directory/elasticsearch/work
path.logs: /your/directory/elasticsearch/logs
path.plugins: /your/directory/elasticsearch/plugins
```

start / stop / test elasticsearch
```bash
sudo sudo /etc/init.d/elasticsearch restart

```



configure project
=====================================

