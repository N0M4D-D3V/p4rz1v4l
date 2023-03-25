#!/bin/zsh
current_date=`date +%m-%d-%Y`
last_update_text="<!-- Days until deadline updated at $current_date -->"
sed -i "3s/.*/$last_update_text/" ../README.md

deadline=$(( ($(date -d "2023-05-01 UTC" +%s) - $(date +%s)) / (60*60*24) ))
deadline_text="<h5 align="center">:warning: Days until Deadline: $deadline :warning:</h5>"
sed -i "4s|.*|$deadline_text|" ../README.md

echo "DEADLINE ==> 05-01-2023"
echo "CURRENT  ==> $current_date"
echo ""
echo "Available days ==> $deadline"

git add ./update-deadline.sh
git commit -m'<> deadline updated <>'
git push origin angular