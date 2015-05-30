#!/usr/bin/env ruby
require 'elasticsearch'

(ARGV.length>0) || puts("usage: ./store.rb dir <dir> ...") || exit(0)
$basedir=Dir.getwd

client = Elasticsearch::Client.new log: true
client.cluster.health
found=false
ARGV.grep(/\.pdf/i).each do |pdf|
      Dir.chdir('to-store')
      dir = pdf.gsub(/\.pdf/,'')+'_OCR'
      pdf_id = dir.gsub(/_OCR/,'')
      if (Dir.exists?(dir))
          Dir.chdir(dir)
          puts "Adding text to elasticsearch for  #{dir}"
          # system "echo \"{ 'url' : '', 'tags' : [], 'text' : '\" > ocr.txt"
          # system "cat ocr_*.txt | tr -d '\"' | tr -d '\' | tr -d \"'\" >> ocr.txt"
          # system "echo \"'}\" >> ocr.txt"
          system "cat ocr_*.txt | tr -d '\"' | tr -d '\' | tr -d \"'\" > ocr.txt"
          ocr_file = open('ocr.txt')
          ocr_content = ocr_file.read
          puts "Add element #{pdf_id}  with url #{pdf} to elasticsearch with #{ocr_content}"
          client.index index: 'scan', type: 'ocr', id: pdf_id, body: { url: pdf, tags: [], text: ocr_content } 
          system "cd .."
          system "mv #{$basedir}/to-store/#{dir} #{$basedir}/archive/"
          puts "elastic search added for #{pdf_id} and moved to archive"
          found=true
      end 
      Dir.chdir($basedir)
end
if (found == true)
   client.indices.refresh index: 'scan'
end
