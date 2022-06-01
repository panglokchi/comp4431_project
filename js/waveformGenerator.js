// // This object represent the waveform generator
// var WaveformGenerator = {
//     // The generateWaveform function takes 4 parameters:
//     //     - type, the type of waveform to be generated
//     //     - frequency, the frequency of the waveform to be generated
//     //     - amp, the maximum amplitude of the waveform to be generated
//     //     - duration, the length (in seconds) of the waveform to be generated
//     generateWaveform: function(type, frequency, amp, duration) {
//         var nyquistFrequency = sampleRate / 2; // Nyquist frequency
//         var totalSamples = Math.floor(sampleRate * duration); // Number of samples to generate
//         var result = []; // The temporary array for storing the generated samples

//         switch(type) {
//             case "sine-time": // Sine wave, time domain
//                 for (var i = 0; i < totalSamples; ++i) {
//                     var currentTime = i / sampleRate;
//                     result.push(amp * Math.sin(2.0 * Math.PI * frequency * currentTime));
//                 }
//                 break;

//             case "square-time": // Square wave, time domain
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				var oneCycle = sampleRate / frequency;
// 				var halfCycle = oneCycle / 2;
// 				for (var i = 0; i < totalSamples; i++) {
// 					var whereInTheCycle = i % parseInt(oneCycle);
// 					if (whereInTheCycle < halfCycle)
// 						// first half of the cycle
// 						result.push(amp * 1); // Assume the highest value is 1
// 					else
// 						// second half of the cycle
// 						result.push(amp * -1); // Assume the lowest value is -1
// 				}
//                 break;

//             case "square-additive": // Square wave, additive synthesis
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				//var max_frequencies = 0;
// 				for (var i = 0; i < totalSamples; i++) {
// 					var t = i / sampleRate;
// 					var sample = 0;
// 					//var frequencies = 0;
// 					for (var k = 1; k * frequency < nyquistFrequency && k <= 499; k += 2) {
// 						sample += (4 / Math.PI) * amp * (1.0 / k) * Math.sin(2 * Math.PI * k * frequency * t);
// 						//frequencies += 1;
// 					}
// 					//max_frequencies = Math.max(max_frequencies,  frequencies);
// 					result.push(sample);
// 				}
// 				//onsole.log(max_frequencies);
//                 break;

//             case "sawtooth-time": // Sawtooth wave, time domain
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				var oneCycle = sampleRate / frequency;
// 				for (var i = 0; i < totalSamples; i++) {
// 					var whereInTheCycle = i % parseInt(oneCycle);
// 					var fractionInTheCycle = whereInTheCycle / oneCycle;
// 					result.push(amp * (2 * (1.0 - fractionInTheCycle) - 1));
// 				}
//                 break;

//             case "sawtooth-additive": // Sawtooth wave, additive synthesis
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				//var max_frequencies = 0;
// 				for (var i = 0; i < totalSamples; i++) {
// 					var t = i / sampleRate;
// 					var sample = 0;
// 					//var frequencies = 0;
// 					for (var k = 1; k * frequency < nyquistFrequency && k <= 250; k += 1) {
// 						sample += (2 / Math.PI) * amp * (1.0 / k) * Math.sin(2 * Math.PI * k * frequency * t);
// 						//frequencies += 1;
// 					}
// 					//max_frequencies = Math.max(max_frequencies,  frequencies);
// 					result.push(sample);
// 				}
// 				//console.log(max_frequencies);
//                 break;

//             case "triangle-additive": // Triangle wave, additive synthesis
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				var basis = $("#triangle-additive-basis>option:selected").val();
// 				for (var i = 0; i < totalSamples; i++) {
// 					var t = i / sampleRate;
// 					var sample = 0;
// 					//var frequencies = 0;
// 					/*
// 					for (var k = 1; k * frequency < nyquistFrequency && k <= 499 ; k += 2) {
// 						sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / (k * k)) * Math.cos(2 * Math.PI * k * frequency * t);
// 						//frequencies += 1;
// 					}
// 					*/
					
// 					for (var k = 0; (2*k+1) * frequency < nyquistFrequency && k <= 249 ; k += 1) {
// 						if (basis == "sine") {
// 							sample += Math.pow(-1, k) * (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.sin(2 * Math.PI * (2*k+1) * frequency * t);
// 						}
// 						if (basis == "cosine") {
// 							sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.cos(2 * Math.PI * (2*k+1) * frequency * t);
// 						}
// 						//frequencies += 1;
// 					}
					
// 					/*
// 					if (basis == "cosine") {
// 						for (var k = 1; k * frequency < nyquistFrequency && k <= 499 ; k += 2) {
// 							sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / (k * k)) * Math.cos(2 * Math.PI * k * frequency * t);
// 							//frequencies += 1;
// 						}
// 					}
// 					if (basis == "sine") {
// 						for (var k = 0; (2*k+1) * frequency < nyquistFrequency && k <= 249 ; k += 1) {
// 							sample += Math.pow(-1, k) * (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.sin(2 * Math.PI * (2*k+1) * frequency * t);
// 						}
// 					}
// 					*/
// 					//console.log(frequencies);
// 					result.push(sample);
// 				}
//                 break;

//             case "karplus-strong": // Karplus-Strong algorithm
//                 /**
//                 * TODO: Complete this generator
//                 **/

//                 // Obtain all the required parameters
//                 var base = $("#karplus-base>option:selected").val();	// "white-nose", "sawtooth"
// 				var type = $("#karplus-input-type>option:selected").val();	// decay time, decay factor, stretch factor
//                 var b = parseFloat($("#karplus-b").val());
//                 var delay = parseInt($("#karplus-p").val());
// 				var s = parseInt($("#karplus-stretch").val());
// 				var decaytime = parseInt($("#karplus-desire-decay-time").val());
// 				var d = parseInt($("#karplus-decay").val());
				
// 				if( $("#karplus-use-freq").prop("checked") ) {
// 					delay = parseInt(sampleRate / frequency);
// 					//console.log(delay);
// 				}
// 				var stretch = 0;
// 				var nostretch = 0;
				
// 				//var delay = 800; // this is p
// 				for (var i = 0; i < totalSamples; i++) {
// 					if (i <= delay) {
// 						if(base == "white-noise") {
// 							//samples[i] = 2 * Math.random() – 1;
// 							result.push(amp * (Math.random() * 2 - 1));
// 						}
// 						if(base == "sawtooth") {
// 							var fractionInTheCycle = i / delay;
// 							result.push(amp * (2 * (1.0 - fractionInTheCycle) - 1));
// 						}
// 					} else {
// 						//samples[i] = 0.5 * (samples[i–delay] + samples[i–delay-1]);

						
// 						var x = i - delay;
// 						var y = i - delay - 1;
// 						var sample = 0;
// 						if(s<1)
// 							s = 1;

// 						if(type == "stretch-factor"){
// 							s = ((i*i) / (delay*delay));
// 							if(i<delay + 10)
// 								console.log(delay, i, s);
// 							if(Math.random() > 1 - 1/s){
// 								stretch++;
// 								// sample = result[x];
// 								sample = 0.5 * ( result[x] + result[y] );
// 							}else{
// 								nostretch++;
// 								// sample = 0.5 * ( result[x] + result[y] );
// 								sample = result[x];
// 							}
// 						}
// 						if(type == "decay-factor" || type == "desire-decay-time"){
// 							sample = d * 0.5 * ( result[x] + result[y] );
// 							//console.log(sample, d);
// 						}
	

// 						// if(i < delay+10)
// 						// 	console.log(Math.random(), 1 - 1/s);

// 						// if(Math.random() > 1 - 1/s){
// 						// 	stretch++;
// 						// 	// sample = result[x];
// 						// 	sample = 0.5 * ( result[x] + result[y] );
// 						// }else{
// 						// 	nostretch++;
// 						// 	// sample = 0.5 * ( result[x] + result[y] );
// 						// 	sample = result[x];
// 						// }
						
// 						// var sample = 0.5 * ( result[x] + result[y] )
// 						if (Math.random() < b) {
// 							result.push(sample);
// 						} else {
// 							result.push(-1 * sample);
// 						}
// 					}
// 				}

// 				console.log(stretch, nostretch);
				
//                 break;

//             case "white-noise": // White noise
//                 /**
//                 * TODO: Complete this generator
//                 **/
// 				for (var i = 0; i < totalSamples; i++) {
// 					result.push(amp * (Math.random() * 2 - 1));
// 				}
//                 break;

//             case "customized-additive-synthesis": // Customized additive synthesis
//                 /**
//                 * TODO: Complete this generator
//                 **/

//                 // Obtain all the required parameters
// 				var harmonics = [];
// 				for (var h = 1; h <= 10; ++h) {
// 					harmonics.push($("#additive-f" + h).val());
// 				}
// 				var samples = []
// 				for (var i = 0; i < totalSamples; i++) {
// 					var t = i / sampleRate;
// 					var sample = 0;
// 					for (var k = 1; k * frequency < nyquistFrequency && k <= 10; k += 1) {
// 						sample += amp * parseFloat(harmonics[k-1]) * Math.sin(2 * Math.PI * k * frequency * t);
// 					}
// 					samples.push(sample);
// 				}
				
// 				var max = 0, min = 0;
// 				for (var i = 0; i < totalSamples; i++) {
// 					if (max < samples[i]) max = samples[i];
// 					if (min > samples[i]) min = samples[i];
// 				}
// 				min = -1 * min;
// 				var biggest = Math.max(max, min);
// 				var multiplier = amp / biggest;
// 				for (var i = 0; i < totalSamples; i++) {
// 					result.push(samples[i] * multiplier);
// 				}
				
//                 break;

//             case "fm": // FM
//                 /**
//                 * TODO: Complete this generator
//                 **/

//                 // Obtain all the required parameters
//                 var carrierFrequency = parseFloat($("#fm-carrier-frequency").val());
//                 var carrierAmplitude = parseFloat($("#fm-carrier-amplitude").val());
//                 var modulationFrequency = parseFloat($("#fm-modulation-frequency").val());
//                 var modulationAmplitude = parseFloat($("#fm-modulation-amplitude").val());
//                 var useADSR = $("#fm-use-adsr").prop("checked");
// 				var useMultipliers = $("#fm-use-freq-multiplier").prop("checked")
//                 if(useADSR) { // Obtain the ADSR parameters
//                     var attackDuration = parseFloat($("#fm-adsr-attack-duration").val()) * sampleRate;
//                     var decayDuration = parseFloat($("#fm-adsr-decay-duration").val()) * sampleRate;
//                     var releaseDuration = parseFloat($("#fm-adsr-release-duration").val()) * sampleRate;
//                     var sustainLevel = parseFloat($("#fm-adsr-sustain-level").val()) / 100.0;
//                 }
// 				if (useMultipliers) {
// 					carrierFrequency *= frequency;
// 					modulationFrequency *= frequency;
// 				}
// 				if( carrierAmplitude > amp ) {
// 					carrierAmplitude = amp;
// 				}
//                 for (var i = 0; i < totalSamples; ++i) {
//                     var currentTime = i / sampleRate;
// 					var modulator = modulationAmplitude * Math.sin(2 * Math.PI * modulationFrequency * currentTime);
// 					if(useADSR) {
// 						if(i < attackDuration) {
// 							modulator *= lerp(0.0, 1.0, i/attackDuration);
// 						} else if (i < attackDuration + decayDuration) {
// 							modulator *= lerp(1.0, sustainLevel, (i-attackDuration)/decayDuration)
// 						} else if (i < totalSamples - releaseDuration) {
// 							modulator *= sustainLevel;
// 						} else {
// 							modulator *= lerp(sustainLevel, 0.0, (i - (totalSamples - releaseDuration))/releaseDuration)
// 						}
// 					}
//                     result.push(carrierAmplitude * Math.sin(2.0 * Math.PI * carrierFrequency * currentTime + modulator));
					
//                 }
// 				/*
// 				for (var i = 0; i < totalSamples; i++) {
// 					var t = i / sampleRate;
// 					var modulator = am * Math.sin(2 * Math.PI * fm * t);
// 					samples[i] = ac * Math.sin(2 * Math.PI * fc * t + modulator);
// 				}
// 				*/
//                 break;

//             case "repeating-narrow-pulse": // Repeating narrow pulse
//                 var cycle = Math.floor(sampleRate / frequency);
//                 for (var i = 0; i < totalSamples; ++i) {
//                     if(i % cycle === 0) {
//                         result.push(amp * 1.0);
//                     } else if(i % cycle === 1) {
//                         result.push(amp * -1.0);
//                     } else {
//                         result.push(0.0);
//                     }
//                 }
//                 break;

//             default:
//                 break;
//         }

//         return result;
//     }
// };

// This object represent the waveform generator
var WaveformGenerator = {
    // The generateWaveform function takes 4 parameters:
    //     - type, the type of waveform to be generated
    //     - frequency, the frequency of the waveform to be generated
    //     - amp, the maximum amplitude of the waveform to be generated
    //     - duration, the length (in seconds) of the waveform to be generated
    generateWaveform: function(type, frequency, amp, duration) {
        var nyquistFrequency = sampleRate / 2; // Nyquist frequency
        var totalSamples = Math.floor(sampleRate * duration); // Number of samples to generate
        var result = []; // The temporary array for storing the generated samples

        switch(type) {
            case "sine-time": // Sine wave, time domain
                for (var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
                    result.push(amp * Math.sin(2.0 * Math.PI * frequency * currentTime));
                }
                break;

            case "square-time": // Square wave, time domain
                /**
                * TODO: Complete this generator
                **/
				var oneCycle = sampleRate / frequency;
				var halfCycle = oneCycle / 2;
				for (var i = 0; i < totalSamples; i++) {
					var whereInTheCycle = i % parseInt(oneCycle);
					if (whereInTheCycle < halfCycle)
						// first half of the cycle
						result.push(amp * 1); // Assume the highest value is 1
					else
						// second half of the cycle
						result.push(amp * -1); // Assume the lowest value is -1
				}
                break;

            case "square-additive": // Square wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				//var max_frequencies = 0;
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var sample = 0;
					//var frequencies = 0;
					for (var k = 1; k * frequency < nyquistFrequency && k <= 499; k += 2) {
						sample += (4 / Math.PI) * amp * (1.0 / k) * Math.sin(2 * Math.PI * k * frequency * t);
						//frequencies += 1;
					}
					//max_frequencies = Math.max(max_frequencies,  frequencies);
					result.push(sample);
				}
				//onsole.log(max_frequencies);
                break;

            case "sawtooth-time": // Sawtooth wave, time domain
                /**
                * TODO: Complete this generator
                **/
				var oneCycle = sampleRate / frequency;
				for (var i = 0; i < totalSamples; i++) {
					var whereInTheCycle = i % parseInt(oneCycle);
					var fractionInTheCycle = whereInTheCycle / oneCycle;
					result.push(amp * (2 * (1.0 - fractionInTheCycle) - 1));
				}
                break;

            case "sawtooth-additive": // Sawtooth wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				//var max_frequencies = 0;
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var sample = 0;
					//var frequencies = 0;
					for (var k = 1; k * frequency < nyquistFrequency && k <= 250; k += 1) {
						sample += (2 / Math.PI) * amp * (1.0 / k) * Math.sin(2 * Math.PI * k * frequency * t);
						//frequencies += 1;
					}
					//max_frequencies = Math.max(max_frequencies,  frequencies);
					result.push(sample);
				}
				//console.log(max_frequencies);
                break;

            case "triangle-additive": // Triangle wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				var basis = $("#triangle-additive-basis>option:selected").val();
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var sample = 0;
					//var frequencies = 0;
					/*
					for (var k = 1; k * frequency < nyquistFrequency && k <= 499 ; k += 2) {
						sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / (k * k)) * Math.cos(2 * Math.PI * k * frequency * t);
						//frequencies += 1;
					}
					*/
					
					for (var k = 0; (2*k+1) * frequency < nyquistFrequency && k <= 249 ; k += 1) {
						if (basis == "sine") {
							sample += Math.pow(-1, k) * (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.sin(2 * Math.PI * (2*k+1) * frequency * t);
						}
						if (basis == "cosine") {
							sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.cos(2 * Math.PI * (2*k+1) * frequency * t);
						}
						//frequencies += 1;
					}
					
					/*
					if (basis == "cosine") {
						for (var k = 1; k * frequency < nyquistFrequency && k <= 499 ; k += 2) {
							sample += (8 / (Math.PI * Math.PI)) * amp * (1.0 / (k * k)) * Math.cos(2 * Math.PI * k * frequency * t);
							//frequencies += 1;
						}
					}
					if (basis == "sine") {
						for (var k = 0; (2*k+1) * frequency < nyquistFrequency && k <= 249 ; k += 1) {
							sample += Math.pow(-1, k) * (8 / (Math.PI * Math.PI)) * amp * (1.0 / ((2*k+1) * (2*k+1))) * Math.sin(2 * Math.PI * (2*k+1) * frequency * t);
						}
					}
					*/
					//console.log(frequencies);
					result.push(sample);
				}
                break;

            case "karplus-strong": // Karplus-Strong algorithm

			
                /**
                * TODO: Complete this generator
                **/
				



                // Obtain all the required parameters
                var base = $("#karplus-base>option:selected").val();	// "white-nose", "sawtooth"
				var type = $("#karplus-input-type>option:selected").val();	// decay time, decay factor, stretch factor
                var b = parseFloat($("#karplus-b").val());
                var delay = parseInt($("#karplus-p").val());
				var s = parseInt($("#karplus-stretch").val());
				var decaytime = parseInt($("#karplus-desire-decay-time").val());
				var d = parseFloat($("#karplus-decay").val());
				var sampleSound = $("#karplus-sample>option:selected").val();
				
				if( $("#karplus-use-freq").prop("checked") ) {
					delay = parseInt(sampleRate / frequency);
					//console.log(delay);
				}



				var stretch = 0;
				var nostretch = 0;
				
				// console.log(d);
				
				// estimated original decay time
				var length = (delay + 1/2)/(-sampleRate*Math.log(Math.cos((2*Math.PI)/(2*delay+1))));
				console.log("original decay time: ",length);
				
				// calculate d
				if(type == "desire-decay-time") {
					// d = e^(-1/(t*f1))/cos(pi * f1 * Ts)
					// t = desired decay time
					// f1 = fs / (p + 1/2)
					// fs = sampling rate
					// Ts = sample period = 1/fs
					if(length > decaytime) {
						type = "decay-factor";
						var f1 = sampleRate/(delay + 1/2); // fundamental frequency
						d = Math.exp(-1/(decaytime * f1))/Math.cos(Math.PI * f1 * 1/sampleRate);	// decay to 1/e
						//d = Math.exp(-1/(decaytime/Math.log(1000) * f1))/Math.cos(Math.PI * f1 * 1/sampleRate);	// decay 60 db
					} else if (length <= decaytime) {
						type = "stretch-factor";
						s = decaytime/length;
					}
				}
				
				//var delay = 800; // this is p
				for (var i = 0; i < totalSamples; i++) {
					if (i <= delay) {
						if(base == "white-noise") {
							//samples[i] = 2 * Math.random() – 1;
							result.push(amp * (Math.random() * 2 - 1));
						}
						if(base == "sawtooth") {
							var fractionInTheCycle = i / delay;
							result.push(amp * (2 * (1.0 - fractionInTheCycle) - 1));
						}
					} else {
						//samples[i] = 0.5 * (samples[i–delay] + samples[i–delay-1]);
						var x = i - delay;
						var y = i - delay - 1;
						var sample = 0;
						if(s<1)
							s = 1;
						//console.log(type);
						
						
						if(type == "desire-decay-time"){
							var decaySample = Math.floor(sampleRate * decaytime);
							if(i < delay)
								sample = result[x];
							else
								sample = 0.5 * ( result[x] + result[y] );
						}
						else if(type == "stretch-factor"){
							if(Math.random() > 1 - 1/s){
								stretch++;
								// sample = result[x];
								sample = 0.5 * ( result[x] + result[y] );
							}else{
								nostretch++;
								// sample = 0.5 * ( result[x] + result[y] );
								sample = result[x];
							}
						}
						else if(type == "decay-factor"){
							sample = d * 0.5 * ( result[x] + result[y] );
							//console.log(sample, d);
						}

						//if(i < delay+10)
							//console.log(Math.random(), 1 - 1/s);

						/*
						if(Math.random() > 1 - 1/s){
							stretch++;
							// sample = result[x];
							sample = 0.5 * ( result[x] + result[y] );
						}else{
							nostretch++;
							// sample = 0.5 * ( result[x] + result[y] );
							sample = result[x];
						}
						*/
						
						// var sample = 0.5 * ( result[x] + result[y] )
						if (Math.random() < b) {
							result.push(sample);
						} else {
							result.push(-1 * sample);
						}
					}
				}

				// console.log(stretch, nostretch);
				
                break;

            case "white-noise": // White noise
                /**
                * TODO: Complete this generator
                **/
				for (var i = 0; i < totalSamples; i++) {
					result.push(amp * (Math.random() * 2 - 1));
				}
                break;

            case "customized-additive-synthesis": // Customized additive synthesis
                /**
                * TODO: Complete this generator
                **/

                // Obtain all the required parameters
				var harmonics = [];
				for (var h = 1; h <= 10; ++h) {
					harmonics.push($("#additive-f" + h).val());
				}
				var samples = []
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var sample = 0;
					for (var k = 1; k * frequency < nyquistFrequency && k <= 10; k += 1) {
						sample += amp * parseFloat(harmonics[k-1]) * Math.sin(2 * Math.PI * k * frequency * t);
					}
					samples.push(sample);
				}
				
				var max = 0, min = 0;
				for (var i = 0; i < totalSamples; i++) {
					if (max < samples[i]) max = samples[i];
					if (min > samples[i]) min = samples[i];
				}
				min = -1 * min;
				var biggest = Math.max(max, min);
				var multiplier = amp / biggest;
				for (var i = 0; i < totalSamples; i++) {
					result.push(samples[i] * multiplier);
				}
				
                break;

            case "fm": // FM
                /**
                * TODO: Complete this generator
                **/

                // Obtain all the required parameters
                var carrierFrequency = parseFloat($("#fm-carrier-frequency").val());
                var carrierAmplitude = parseFloat($("#fm-carrier-amplitude").val());
                var modulationFrequency = parseFloat($("#fm-modulation-frequency").val());
                var modulationAmplitude = parseFloat($("#fm-modulation-amplitude").val());
                var useADSR = $("#fm-use-adsr").prop("checked");
				var useMultipliers = $("#fm-use-freq-multiplier").prop("checked")
                if(useADSR) { // Obtain the ADSR parameters
                    var attackDuration = parseFloat($("#fm-adsr-attack-duration").val()) * sampleRate;
                    var decayDuration = parseFloat($("#fm-adsr-decay-duration").val()) * sampleRate;
                    var releaseDuration = parseFloat($("#fm-adsr-release-duration").val()) * sampleRate;
                    var sustainLevel = parseFloat($("#fm-adsr-sustain-level").val()) / 100.0;
                }
				if (useMultipliers) {
					carrierFrequency *= frequency;
					modulationFrequency *= frequency;
				}
				if( carrierAmplitude > amp ) {
					carrierAmplitude = amp;
				}
                for (var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
					var modulator = modulationAmplitude * Math.sin(2 * Math.PI * modulationFrequency * currentTime);
					if(useADSR) {
						if(i < attackDuration) {
							modulator *= lerp(0.0, 1.0, i/attackDuration);
						} else if (i < attackDuration + decayDuration) {
							modulator *= lerp(1.0, sustainLevel, (i-attackDuration)/decayDuration)
						} else if (i < totalSamples - releaseDuration) {
							modulator *= sustainLevel;
						} else {
							modulator *= lerp(sustainLevel, 0.0, (i - (totalSamples - releaseDuration))/releaseDuration)
						}
					}
                    result.push(carrierAmplitude * Math.sin(2.0 * Math.PI * carrierFrequency * currentTime + modulator));
					
                }
				/*
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var modulator = am * Math.sin(2 * Math.PI * fm * t);
					samples[i] = ac * Math.sin(2 * Math.PI * fc * t + modulator);
				}
				*/
                break;

            case "repeating-narrow-pulse": // Repeating narrow pulse
                var cycle = Math.floor(sampleRate / frequency);
                for (var i = 0; i < totalSamples; ++i) {
                    if(i % cycle === 0) {
                        result.push(amp * 1.0);
                    } else if(i % cycle === 1) {
                        result.push(amp * -1.0);
                    } else {
                        result.push(0.0);
                    }
                }
                break;

            default:
                break;
        }

        return result;
    }
};