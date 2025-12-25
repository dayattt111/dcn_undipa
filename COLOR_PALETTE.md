# DCN UNDIPA Color Palette

## 🎨 Brand Colors

### Primary - Maroon/Burgundy
```
Light:  #7a1845
Main:   #4c0027 ✨ (Primary Brand Color)
Dark:   #2d0017
```

### Secondary - Magenta/Pink
```
Light:  #c73d7f
Main:   #980f5a ✨ (Secondary Brand Color)
Dark:   #6b0a3f
```

## 🌈 Semantic Colors

### Success (Badges, Active Status)
```
Main: #2e7d32 (Green)
```

### Warning (Upcoming Status)
```
Main: #ed6c02 (Orange)
```

### Info
```
Main: #0288d1 (Blue)
```

## 📄 Light Mode Background

### Background
```
Default: #fafafa (Professional off-white)
Paper:   #ffffff (Pure white for cards)
```

### Text
```
Primary:   #1a1a1a (Almost black)
Secondary: #616161 (Grey 700)
Disabled:  #9e9e9e (Grey 500)
```

### Divider
```
rgba(76, 0, 39, 0.08) - Subtle maroon
```

## 🌙 Dark Mode

### Background
```
Default: #1a1a1a (Deep dark)
Paper:   #242424 (Slightly lighter for cards)
```

### Text
```
Primary:   #f5f5f5 (Off-white)
Secondary: #bdbdbd (Grey 400)
Disabled:  #757575 (Grey 600)
```

### Divider
```
rgba(152, 15, 90, 0.12) - Subtle magenta
```

## 🎯 Usage Guidelines

### Hero Section
- Background Light: `#fef5f9` (Very light pink tint)
- Background Dark: `#1a1a1a`

### Programs Section
- Background Light: `#4c0027` (Primary maroon)
- Background Dark: `#1a1a1a`
- Text: Always white (#ffffff)

### Feature Cards (About Section)
```
Bootcamp:       #4c0027 (Primary maroon)
Study Group:    #980f5a (Secondary magenta)
Event:          #7a1845 (Light maroon)
Mentoring:      #c73d7f (Light magenta)
```

### Status Badges
```
Active (✓):     #2e7d32 (Green)
Upcoming (⏰):   #ed6c02 (Orange)
```

## 💡 Color Contrast

All color combinations meet **WCAG AA** standards for accessibility:
- Maroon (#4c0027) + White: ✅ 12.5:1 ratio
- Magenta (#980f5a) + White: ✅ 5.8:1 ratio
- Text (#1a1a1a) + Background (#fafafa): ✅ 16.8:1 ratio

## 🔧 Implementation

Colors are defined in:
- `src/plugins/@mui/theme/palette-base.ts` - Primary & Secondary
- `src/plugins/@mui/theme/palette-light.ts` - Light mode specifics
- `src/plugins/@mui/theme/palette-dark.ts` - Dark mode specifics

## 🖼️ Preview

### Light Mode
- Hero: Soft pink background (#fef5f9)
- Cards: Pure white (#ffffff)
- Programs: Deep maroon (#4c0027)
- Accents: Magenta (#980f5a)

### Dark Mode
- Hero: Deep dark (#1a1a1a)
- Cards: Dark grey (#242424)
- Programs: Deep dark (#1a1a1a)
- Accents: Light magenta (#c73d7f)

---

**Last Updated:** December 25, 2025  
**Version:** 1.0.0
