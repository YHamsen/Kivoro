#!/usr/bin/env python3
"""
Script to replace emoji flags with actual flag image URLs in airaloCountries.ts
"""

import re

# Mapping emoji flags to country codes and flag URLs
flag_mappings = {
    '🇺🇸': ('US', 'https://flagcdn.com/w320/us.png'),
    '🇨🇦': ('CA', 'https://flagcdn.com/w320/ca.png'), 
    '🇲🇽': ('MX', 'https://flagcdn.com/w320/mx.png'),
    '🇫🇷': ('FR', 'https://flagcdn.com/w320/fr.png'),
    '🇩🇪': ('DE', 'https://flagcdn.com/w320/de.png'),
    '🇬🇧': ('GB', 'https://flagcdn.com/w320/gb.png'),
    '🇮🇹': ('IT', 'https://flagcdn.com/w320/it.png'),
    '🇪🇸': ('ES', 'https://flagcdn.com/w320/es.png'),
    '🇳🇱': ('NL', 'https://flagcdn.com/w320/nl.png'),
    '🇯🇵': ('JP', 'https://flagcdn.com/w320/jp.png'),
    '🇰🇷': ('KR', 'https://flagcdn.com/w320/kr.png'),
    '🇨🇳': ('CN', 'https://flagcdn.com/w320/cn.png'),
    '🇹🇭': ('TH', 'https://flagcdn.com/w320/th.png'),
    '🇸🇬': ('SG', 'https://flagcdn.com/w320/sg.png'),
    '🇦🇺': ('AU', 'https://flagcdn.com/w320/au.png'),
    '🇳🇿': ('NZ', 'https://flagcdn.com/w320/nz.png'),
    '🇦🇪': ('AE', 'https://flagcdn.com/w320/ae.png'),
    '🇸🇦': ('SA', 'https://flagcdn.com/w320/sa.png'),
    '🇿🇦': ('ZA', 'https://flagcdn.com/w320/za.png'),
    '🇪🇬': ('EG', 'https://flagcdn.com/w320/eg.png'),
    '🇧🇷': ('BR', 'https://flagcdn.com/w320/br.png'),
    '🇦🇷': ('AR', 'https://flagcdn.com/w320/ar.png'),
    '🇨🇱': ('CL', 'https://flagcdn.com/w320/cl.png'),
    '🇮🇳': ('IN', 'https://flagcdn.com/w320/in.png'),
    '🇷🇺': ('RU', 'https://flagcdn.com/w320/ru.png'),
    '🇹🇷': ('TR', 'https://flagcdn.com/w320/tr.png'),
}

def update_flags():
    # Read the file
    with open('/workspace/kivoro-enhanced/src/data/airaloCountries.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace emoji flags with URLs
    for emoji, (code, url) in flag_mappings.items():
        content = content.replace(f"flag: '{emoji}'", f"flag: '{url}'")
    
    # Write back the file
    with open('/workspace/kivoro-enhanced/src/data/airaloCountries.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Flags updated successfully!")

if __name__ == '__main__':
    update_flags()
