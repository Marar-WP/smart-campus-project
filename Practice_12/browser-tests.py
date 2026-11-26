from playwright.sync_api import sync_playwright
from pathlib import Path
import json
p=Path('/mnt/data/practice12'); cases=[('T1','11:30','12:30',False,'Available'),('T2','10:30','11:30',False,'Unavailable'),('T3','11:30','12:30',True,'Unavailable'),('T4','11:30','11:30',False,'Unavailable'),('T5','11:00','13:01',False,'Unavailable'),('T6','08:00','08:30',False,'Unavailable'),('T7','11:00','12:00',False,'Available')]
with sync_playwright() as w:
 b=w.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']); page=b.new_page(viewport={'width':900,'height':850}); page.set_content((p/'code-based.html').read_text()); page.screenshot(path=str(p/'baseline.png'),full_page=True); results=[]
 for t,s,e,blocked,expected in cases:
  page.locator('#start-time').fill(s);page.locator('#end-time').fill(e);page.get_by_role('checkbox',name='Toggle room blocked').set_checked(blocked,force=True);page.get_by_role('button',name='Check Availability',exact=True).click(); assert page.get_by_text(expected,exact=True).is_visible(); results.append(t+' PASS');page.screenshot(path=str(p/(t+'.png')),full_page=True)
 assert page.get_by_text('10:00 – 11:00',exact=False).count() or page.get_by_text('10:00–11:00',exact=False).count() or '10:00' in page.locator('body').inner_text(); print(results); print(page.locator('body').inner_text()); b.close()
