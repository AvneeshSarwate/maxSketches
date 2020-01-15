{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 1,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 59.0, 104.0, 1116.0, 853.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-18",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Spectral Filter.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 555.0, 464.0, 363.0, 116.0 ],
					"varname" : "bp.Spectral Filter",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-16",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Gigaverb.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 140.0, 482.0, 332.0, 116.0 ],
					"varname" : "bp.Gigaverb",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-15",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO2.maxpat",
					"numinlets" : 1,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 622.0, 35.0, 170.0, 116.0 ],
					"varname" : "bp.LFO2",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-14",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Compressor.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 81.0, 626.0, 339.0, 116.0 ],
					"varname" : "bp.Compressor",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-3",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Granular.maxpat",
					"numinlets" : 4,
					"numoutlets" : 3,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "" ],
					"patching_rect" : [ 293.0, 190.0, 541.0, 214.0 ],
					"varname" : "bp.Granular",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-2",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Stereo.maxpat",
					"numinlets" : 2,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 181.0, 759.0, 148.0, 116.0 ],
					"varname" : "bp.Stereo",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 1 ],
					"source" : [ "obj-14", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 2 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 1 ],
					"source" : [ "obj-16", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 1 ],
					"order" : 0,
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"order" : 1,
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-14::obj-44" : [ "Input", "Input", 0 ],
			"obj-3::obj-45" : [ "DurationRandomAmt", "Random", 0 ],
			"obj-3::obj-28" : [ "Offset", "Offset", 0 ],
			"obj-14::obj-2" : [ "Output", "Output", 0 ],
			"obj-16::obj-3" : [ "Regen", "Regen", 0 ],
			"obj-3::obj-3" : [ "Position", "Position", 0 ],
			"obj-2::obj-55" : [ "DSP", "DSP", 0 ],
			"obj-14::obj-12" : [ "Bypass", "Bypass", 0 ],
			"obj-16::obj-28" : [ "Size", "Size", 0 ],
			"obj-3::obj-12" : [ "Mute[1]", "Mute", 0 ],
			"obj-3::obj-71" : [ "Pan", "Pan", 0 ],
			"obj-18::obj-71" : [ "multislider", "multislider", 0 ],
			"obj-3::obj-19" : [ "CV2", "CV2", 0 ],
			"obj-16::obj-23" : [ "bypass", "bypass", 0 ],
			"obj-16::obj-62" : [ "Dry", "Dry", 0 ],
			"obj-3::obj-58" : [ "PanRandomAmt", "Random", 0 ],
			"obj-15::obj-81" : [ "Phase-Inversion", "Phase-Inversion", 1 ],
			"obj-14::obj-35" : [ "slider[2]", "slider[2]", 0 ],
			"obj-3::obj-25" : [ "CV", "CV", 0 ],
			"obj-18::obj-33::obj-2" : [ "a_state", "a_state", 0 ],
			"obj-2::obj-52" : [ "Level", "Level", 0 ],
			"obj-18::obj-80" : [ "EditMode", "EditMode", 0 ],
			"obj-3::obj-114" : [ "MaxGrains", "MaxGrains", 0 ],
			"obj-18::obj-33::obj-1" : [ "b_state", "b_state", 0 ],
			"obj-15::obj-75" : [ "Shape", "Shape", 0 ],
			"obj-16::obj-65" : [ "Spread", "Spread", 0 ],
			"obj-15::obj-89" : [ "SyncRate", "Rate", 0 ],
			"obj-2::obj-22" : [ "Mute", "Mute", 0 ],
			"obj-15::obj-144" : [ "Phase", "Phase", 0 ],
			"obj-14::obj-78" : [ "Ratio", "Ratio", 0 ],
			"obj-16::obj-66" : [ "Time", "Time", 0 ],
			"obj-18::obj-63::obj-8" : [ "StealthInit", "StealthInit", 0 ],
			"obj-14::obj-15::obj-2" : [ "pastebang[1]", "pastebang", 0 ],
			"obj-15::obj-88" : [ "Time Mode", "Time Mode", 1 ],
			"obj-14::obj-52" : [ "Threshold", "Threshold", 0 ],
			"obj-15::obj-94" : [ "Re-Trigger", "Re-Trigger", 0 ],
			"obj-18::obj-2" : [ "Response", "Response", 0 ],
			"obj-18::obj-7" : [ "bypass[1]", "bypass", 0 ],
			"obj-3::obj-47" : [ "Duration", "Duration", 0 ],
			"obj-16::obj-63" : [ "Early", "Early", 0 ],
			"obj-3::obj-94" : [ "PitchRandomAmt", "Random", 0 ],
			"obj-3::obj-141" : [ "live.button", "live.button", 0 ],
			"obj-14::obj-28" : [ "Attack", "Attack", 0 ],
			"obj-15::obj-74" : [ "Rate", "Rate", 0 ],
			"obj-14::obj-34" : [ "slider[3]", "slider[3]", 0 ],
			"obj-15::obj-12" : [ "Mute[2]", "Mute", 0 ],
			"obj-16::obj-60" : [ "Damp", "Damp", 0 ],
			"obj-3::obj-115" : [ "NewGrainEvery", "NewGrainEvery", 0 ],
			"obj-16::obj-64" : [ "Tail", "Tail", 0 ],
			"obj-3::obj-101" : [ "Width", "Width", 0 ],
			"obj-2::obj-56" : [ "OutputChannel", "OutputChannel", 0 ],
			"obj-14::obj-47" : [ "Release", "Release", 0 ],
			"obj-3::obj-98::obj-2" : [ "pastebang", "pastebang", 0 ],
			"parameterbanks" : 			{

			}
,
			"parameter_overrides" : 			{
				"obj-3::obj-12" : 				{
					"parameter_longname" : "Mute[1]"
				}
,
				"obj-14::obj-15::obj-2" : 				{
					"parameter_longname" : "pastebang[1]"
				}
,
				"obj-18::obj-7" : 				{
					"parameter_longname" : "bypass[1]"
				}
,
				"obj-15::obj-12" : 				{
					"parameter_longname" : "Mute[2]"
				}

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "bp.Stereo.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Output",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Granular.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.rgrain.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "rchoosef.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "rchoose.maxpat",
				"bootpath" : "~/Library/Application Support/Cycling '74/Max 8/Examples/sampling/granular/lib",
				"patcherrelativepath" : "../../Library/Application Support/Cycling '74/Max 8/Examples/sampling/granular/lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "transratio.maxpat",
				"bootpath" : "~/Library/Application Support/Cycling '74/Max 8/Examples/max-tricks/notes-and-pitch/pitch-to-freq-ratio",
				"patcherrelativepath" : "../../Library/Application Support/Cycling '74/Max 8/Examples/max-tricks/notes-and-pitch/pitch-to-freq-ratio",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pastebang.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.arc.accum-2.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.arc.knob.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Compressor.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Effects",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.LFO2.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/LFO",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Gigaverb.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Effects",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Spectral Filter.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.fp_fft.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
